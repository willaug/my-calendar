import { Account } from '@interfaces/index';
import { Knex } from 'knex';
import myCalendarDatabase from '@core/database';
import CustomApolloError from '@core/errors/custom-apollo-error';
import AccountsMapper from './mapper';

function throwError(err: any, field: any = null): void {
  if (err.constraint === 'accounts_email_unique') {
    throw new CustomApolloError(
      `column email (${field}) already in an account`,
      'ACCOUNTS_EMAIL_DUPLICATED',
    );
  }

  throw new Error(err);
}

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
      return throwError(err, accountInput.email);
    }
  }
}

export default new AccountsModel();
