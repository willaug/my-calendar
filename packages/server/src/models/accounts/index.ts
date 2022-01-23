import { createWriteStream, statSync, unlinkSync } from 'fs';
import { ApolloError } from 'apollo-server-express';
import { finished } from 'stream/promises';
import { compare, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import { Knex } from 'knex';
import sharp from 'sharp';

import throwError from '@core/functions/errors/throw-error';
import { AccountSnakeCase } from '@interfaces/index';
import myCalendarDatabase from '@core/database';
import AccountsMapper from './mapper';

class AccountsModel extends AccountsMapper {
  public database: Knex;

  public constructor() {
    super();
    this.database = myCalendarDatabase;
  }

  public async account({ authAccount }): Promise<AccountSnakeCase> {
    return this.database<AccountSnakeCase>('accounts')
      .where('id', authAccount.account_id)
      .first();
  }

  public async createAccount({ accountInput }): Promise<AccountSnakeCase | void> {
    try {
      const [response] = await this.database<AccountSnakeCase>('accounts')
        .insert(await AccountsMapper.toCreateAccount(accountInput))
        .returning('*');

      return response;
    } catch (err) {
      return throwError(err);
    }
  }

  public async updateAccount({ accountInput, authAccount }): Promise<AccountSnakeCase | void> {
    try {
      const [response] = await this.database<AccountSnakeCase>('accounts')
        .update(accountInput)
        .where('id', authAccount.account_id)
        .returning('*');

      return response;
    } catch (err) {
      return throwError(err);
    }
  }

  public async updatePassAccount({ passAccountInput, authAccount }): Promise<AccountSnakeCase> {
    const account = await this.database<AccountSnakeCase>('accounts')
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
    const [response] = await this.database<AccountSnakeCase>('accounts')
      .update({ password })
      .where('id', authAccount.account_id)
      .returning('*');

    return response;
  }

  public async uploadPhotoAccount({ photoAccountInput, authAccount }): Promise<AccountSnakeCase> {
    const { createReadStream, filename, mimetype } = await photoAccountInput;

    const allowedMimes = ['image/jpg', 'image/jpeg', 'image/png'];
    if (!allowedMimes.includes(mimetype)) {
      throw new ApolloError(
        'invalid photo format',
        'INVALID_PHOTO_FORMAT',
      );
    }

    const stream = createReadStream();
    const randomString = randomBytes(32).toString('hex');
    const path = `${__dirname}/../../../public/images/accounts/`;

    const fileExtension = extname(filename);
    const newFilename = `${randomString}-not-resized${fileExtension}`;
    const filePath = `${path}${newFilename}`;
    const newFilePath = filePath.replace('not-resized', '256px');

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

    await sharp(filePath).resize(256, 256, { fit: 'cover' }).toFile(newFilePath);
    unlinkSync(filePath);

    return this.database.transaction(async (trx: Knex): Promise<AccountSnakeCase> => {
      const account = await trx<AccountSnakeCase>('accounts')
        .where('id', authAccount.account_id)
        .first();

      if (account.photo_path) {
        unlinkSync(`${__dirname}/../../../public/images/accounts/${account.photo_path}`);
      }

      const [response] = await this.database<AccountSnakeCase>('accounts')
        .update('photo_path', newFilename.replace('not-resized', '256px'))
        .where('id', authAccount.account_id)
        .returning('*');

      return response;
    });
  }

  public async deletePhotoAccount({ authAccount }): Promise<AccountSnakeCase> {
    return this.database.transaction(async (trx: Knex): Promise<AccountSnakeCase> => {
      const account = await trx<AccountSnakeCase>('accounts')
        .where('id', authAccount.account_id)
        .first();

      if (!account.photo_path) {
        throw new ApolloError(
          'account has no image to delete',
          'ACCOUNT_HAS_NO_IMAGE',
        );
      }

      unlinkSync(`${__dirname}/../../../public/images/accounts/${account.photo_path}`);
      const [response] = await trx<AccountSnakeCase>('accounts')
        .update('photo_path', null)
        .where('id', authAccount.account_id)
        .returning('*');

      return response;
    });
  }
}

export default new AccountsModel();
