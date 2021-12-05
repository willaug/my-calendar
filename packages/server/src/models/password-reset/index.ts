import { generatePasswordResetToken } from '@core/functions/token/generate-token';
import translate from '@core/functions/translate';
import { sendEmail } from '@core/functions/emails/send-email';
import { ApolloError } from 'apollo-server-express';
import DeviceDetector from 'device-detector-js';
import myCalendarDatabase from '@core/database';
import { Knex } from 'knex';
import axios from 'axios';
import {
  AccountSnackCase,
  PasswordResetAccountLocation,
  PasswordResetMessage,
  PasswordResetSnackCase,
} from '@interfaces/index';
import portuguese from '@core/functions/emails/templates/password-reset/i18n/portuguese';
import english from '@core/functions/emails/templates/password-reset/i18n/english';
import PasswordResetMapper from './mapper';

function accountDeviceInfo(userAgent: string): DeviceDetector.DeviceDetectorResult {
  const deviceDetector = new DeviceDetector();
  return deviceDetector.parse(userAgent);
}

async function accountLocationInfo(ip: string): Promise<PasswordResetAccountLocation> {
  const { data } = await axios(`http://ip-api.com/json/${ip}`);
  return data as PasswordResetAccountLocation;
}

class PasswordResetModel extends PasswordResetMapper {
  public database: Knex;

  public constructor() {
    super();
    this.database = myCalendarDatabase;
  }

  public async createPasswordReset({ lang, passwordResetInput, userAgent }): Promise<PasswordResetMessage> {
    const account = await this.database<AccountSnackCase>('accounts')
      .where('email', passwordResetInput.email)
      .first();

    if (!account) {
      throw new ApolloError(
        'Account does not exist',
        'ACCOUNT_DOES_NOT_EXIST',
      );
    }

    const [passwordReset] = await this.database<PasswordResetSnackCase>('password_reset')
      .insert(PasswordResetMapper.toCreatePasswordReset({
        account,
        passwordResetInput,
        accountLocation: await accountLocationInfo(passwordResetInput.ip),
        agent: accountDeviceInfo(userAgent),
        token: generatePasswordResetToken(),
      }))
      .returning('*');

    const translatedData = translate({ lang, langData: { portuguese, english } });
    await sendEmail({
      fromEmail: process.env.PASS_RESET_FROM_EMAIL_ADDRESS || 'no-reply@mycalendar.com',
      toEmail: account.email,
      title: translatedData.SUBJECT,
      template: {
        path: '/password-reset/create-password-reset.ejs',
        variables: { account, passwordReset, translatedData },
      },
    });

    return { message: 'success' };
  }
}

export default new PasswordResetModel();
