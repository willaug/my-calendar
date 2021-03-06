import { sendEmail } from '@core/functions/emails/send-email';
import { ApolloError } from 'apollo-server-express';
import DeviceDetector from 'device-detector-js';
import { randomBytes } from 'crypto';
import { Knex } from 'knex';
import moment from 'moment';
import axios from 'axios';

import portuguese from '@core/functions/emails/templates/password-reset/i18n/portuguese';
import english from '@core/functions/emails/templates/password-reset/i18n/english';
import translate from '@core/functions/utils/translate';
import {
  generateRequesterDevice,
  generateRequesterLocation,
} from '@core/functions/utils/generate-requester';
import myCalendarDatabase from '@core/database';
import {
  AccountSnakeCase,
  PasswordResetAccountLocation,
  PasswordResetMessage,
  PasswordResetSnakeCase,
} from '@interfaces/index';
import PasswordResetMapper from './mapper';

function accountDeviceInfo(userAgent: string): DeviceDetector.DeviceDetectorResult {
  const deviceDetector = new DeviceDetector();
  return deviceDetector.parse(userAgent);
}

async function accountLocationInfo(ip: string): Promise<PasswordResetAccountLocation> {
  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'production') {
    const { data } = await axios(`http://ip-api.com/json/${ip}`);
    return data as PasswordResetAccountLocation;
  }

  return {};
}

class PasswordResetModel extends PasswordResetMapper {
  public database: Knex;

  public constructor() {
    super();
    this.database = myCalendarDatabase;
  }

  public async createPasswordReset({ passwordResetInput, userAgent }): Promise<PasswordResetMessage> {
    const account = await this.database<AccountSnakeCase>('accounts')
      .where('email', passwordResetInput.email)
      .first();

    if (!account) {
      throw new ApolloError(
        'account does not exist',
        'ACCOUNT_DOES_NOT_EXIST',
      );
    }

    const [passwordReset] = await this.database<PasswordResetSnakeCase>('password_reset')
      .insert(PasswordResetMapper.toCreatePasswordReset({
        account,
        passwordResetInput,
        accountLocation: await accountLocationInfo(passwordResetInput.ip),
        agent: accountDeviceInfo(userAgent),
        token: randomBytes(70).toString('hex'),
      }))
      .returning('*');

    passwordReset.solicited_by_requester_location = generateRequesterLocation(passwordReset.solicited_by);
    passwordReset.solicited_by_requester_device = generateRequesterDevice(passwordReset.solicited_by);

    const translatedData = translate({ lang: account.language, langData: { portuguese, english } });
    await sendEmail({
      fromEmail: process.env.PASS_RESET_FROM_EMAIL_ADDRESS || 'no-reply@mycalendar.com',
      toEmail: account.email,
      title: translatedData.CREATE_SUBJECT,
      template: {
        path: '/password-reset/create-password-reset.ejs',
        variables: { account, passwordReset, translatedData },
      },
    });

    return { message: 'success' };
  }

  public async updatePasswordReset({ passwordResetInput, userAgent }): Promise<PasswordResetMessage> {
    const passwordReset = await this.database<PasswordResetSnakeCase>('password_reset')
      .where('token', passwordResetInput.token)
      .first();

    if (!passwordReset) {
      throw new ApolloError(
        'password reset token does not exist',
        'PASSWORD_RESET_TOKEN_DOES_NOT_EXIST',
      );
    }

    if (passwordReset.used) {
      throw new ApolloError(
        'password reset token has already been used',
        'PASSWORD_RESET_TOKEN_HAS_ALREADY_BEEN_USED',
      );
    }

    if (moment().isAfter(passwordReset.expires_at)) {
      throw new ApolloError(
        'password reset token expired',
        'PASSWORD_RESET_TOKEN_EXPIRED',
      );
    }

    const updatedData = await this.database.transaction(async (trx: Knex): Promise<any> => {
      const [passwordResetUpdated] = await trx<PasswordResetSnakeCase>('password_reset')
        .update(PasswordResetMapper.toUpdatePasswordReset({
          passwordResetInput,
          accountLocation: await accountLocationInfo(passwordResetInput.ip),
          agent: accountDeviceInfo(userAgent),
        }))
        .where('id', passwordReset.id)
        .returning('*');

      const [account] = await trx<AccountSnakeCase>('accounts')
        .update(await PasswordResetMapper.toUpdateAccountPassword(passwordResetInput.newPassword))
        .where('id', passwordResetUpdated.account_id)
        .returning('*');

      return {
        account,
        passwordResetUpdated,
      };
    });

    const { account, passwordResetUpdated } = updatedData;
    passwordResetUpdated.updated_by_requester_location = generateRequesterLocation(passwordResetUpdated.updated_by);
    passwordResetUpdated.updated_by_requester_device = generateRequesterDevice(passwordResetUpdated.updated_by);

    const translatedData = translate({ lang: account.language, langData: { portuguese, english } });
    await sendEmail({
      fromEmail: process.env.PASS_RESET_FROM_EMAIL_ADDRESS || 'no-reply@mycalendar.com',
      toEmail: account.email,
      title: translatedData.UPDATE_SUBJECT,
      template: {
        path: '/password-reset/update-password-reset.ejs',
        variables: {
          account,
          passwordReset: passwordResetUpdated,
          translatedData,
        },
      },
    });

    return { message: 'success' };
  }
}

export default new PasswordResetModel();
