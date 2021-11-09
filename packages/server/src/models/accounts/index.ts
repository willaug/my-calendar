import { Account } from '@interfaces/index';
import { Knex } from 'knex';
import myCalendarDatabase from '@core/database';
import throwError from '@core/errors/throw-error';
import AccountsMapper from './mapper';

class AccountsModel extends AccountsMapper {
  public database: Knex;

  public constructor() {
    super();
    this.database = myCalendarDatabase;
  }

  public async createAccount({ accountInput }): Promise<Account | void> {
    try {
      const [response] = await this.database('accounts')
        .insert(await AccountsMapper.toCreateAccount(accountInput))
        .returning('*');

      return response;
    } catch (err) {
      return throwError(err);
    }
  }
}

export default new AccountsModel();
