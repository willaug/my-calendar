import { Knex } from 'knex';
import { AccountSnackCase } from '@interfaces/index';
import myCalendarDatabase from '@core/database';
import throwError from '@core/functions/errors/throw-error';
import AccountsMapper from './mapper';

class AccountsModel extends AccountsMapper {
  public database: Knex;

  public constructor() {
    super();
    this.database = myCalendarDatabase;
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
}

export default new AccountsModel();
