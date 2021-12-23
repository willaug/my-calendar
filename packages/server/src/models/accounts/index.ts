import { createWriteStream, statSync, unlinkSync } from 'fs';
import { ApolloError } from 'apollo-server-express';
import { finished } from 'stream/promises';
import { compare, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import { Knex } from 'knex';

import throwError from '@core/functions/errors/throw-error';
import { AccountSnackCase } from '@interfaces/index';
import myCalendarDatabase from '@core/database';
import AccountsMapper from './mapper';

class AccountsModel extends AccountsMapper {
  public database: Knex;

  public constructor() {
    super();
    this.database = myCalendarDatabase;
  }

  public async account({ authAccount }): Promise<AccountSnackCase> {
    return this.database<AccountSnackCase>('accounts')
      .where('id', authAccount.account_id)
      .first();
  }

  public async createAccount({ accountInput }): Promise<AccountSnackCase | void> {
    try {
      const [response] = await this.database<AccountSnackCase>('accounts')
        .insert(await AccountsMapper.toCreateAccount(accountInput))
        .returning('*');

      return response;
    } catch (err) {
      return throwError(err);
    }
  }

  public async updateAccount({ accountInput, authAccount }): Promise<AccountSnackCase | void> {
    try {
      const [response] = await this.database<AccountSnackCase>('accounts')
        .update(accountInput)
        .where('id', authAccount.account_id)
        .returning('*');

      return response;
    } catch (err) {
      return throwError(err);
    }
  }

  public async updatePassAccount({ passAccountInput, authAccount }): Promise<AccountSnackCase> {
    const account = await this.database<AccountSnackCase>('accounts')
      .where('id', authAccount.account_id)
      .first();

    const isCorrectPassword = await compare(passAccountInput.currentPassword, account.password);
    if (!isCorrectPassword) {
      throw new ApolloError(
        'the current password is incorrect',
        'CURRENT_PASSWORD_INCORRECT',
      );
    }

    const password = await hash(passAccountInput.newPassword, Number(process.env.HASH_SALT) || 10);
    const [response] = await this.database<AccountSnackCase>('accounts')
      .update({ password })
      .where('id', authAccount.account_id)
      .returning('*');

    return response;
  }

  public async uploadPhotoAccount({ photoAccountInput, authAccount }): Promise<AccountSnackCase> {
    const { createReadStream, filename, mimetype } = await photoAccountInput;

    const allowedMimes = ['image/jpg', 'image/jpeg', 'image/png'];
    if (!allowedMimes.includes(mimetype)) {
      throw new ApolloError(
        'invalid photo format',
        'INVALID_PHOTO_FORMAT',
      );
    }

    const stream = createReadStream();
    const fileExtension = extname(filename);
    const randomString = randomBytes(32).toString('hex');
    const newFilename = `${randomString}-192px${fileExtension}`;
    const filePath = `${__dirname}/../../../public/images/accounts/${newFilename}`;

    const writeStream = createWriteStream(filePath);
    stream.pipe(writeStream);
    await finished(writeStream);

    const { size } = statSync(filePath);
    const maxSizeFile = 2 * 1024 * 1024;
    if (size > maxSizeFile) {
      unlinkSync(filePath);
      throw new ApolloError(
        'photo exceeds the maximum size of 2 mb',
        'PHOTO_EXCEEDS_MAXIMUM_SIZE',
      );
    }

    const [response] = await this.database<AccountSnackCase>('accounts')
      .update('photo_path', newFilename)
      .where('id', authAccount.account_id)
      .returning('*');

    return response;
  }

  public async deletePhotoAccount({ authAccount }): Promise<AccountSnackCase> {
    return this.database.transaction(async (trx: Knex): Promise<AccountSnackCase> => {
      const account = await trx<AccountSnackCase>('accounts')
        .where('id', authAccount.account_id)
        .first();

      if (!account.photo_path) {
        throw new ApolloError(
          'account has no image to delete',
          'ACCOUNT_HAS_NO_IMAGE',
        );
      }

      unlinkSync(`${__dirname}/../../../public/images/accounts/${account.photo_path}`);
      const [response] = await trx<AccountSnackCase>('accounts')
        .update('photo_path', null)
        .where('id', authAccount.account_id)
        .returning('*');

      return response;
    });
  }
}

export default new AccountsModel();
