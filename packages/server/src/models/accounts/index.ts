import { Knex } from 'knex';
import { compare, hash } from 'bcrypt';
import { ApolloError } from 'apollo-server-express';

import { AccountSnackCase } from '@interfaces/index';
import throwError from '@core/functions/errors/throw-error';
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
}

export default new AccountsModel();
