import { ApolloError } from 'apollo-server-express';
import { compare } from 'bcrypt';
import { Knex } from 'knex';

import { generateAuthToken } from '@core/functions/token/generate-token';
import { AccountSnakeCase, Login } from '@interfaces/index';
import myCalendarDatabase from '@core/database';

function throwLoginError(): void {
  throw new ApolloError(
    'the email or password is incorrect',
    'EMAIL_OR_PASSWORD_INCORRECT',
  );
}

class LoginModel {
  public database: Knex;

  public constructor() {
    this.database = myCalendarDatabase;
  }

  public async authenticate({ loginInput }): Promise<Login | void> {
    const account = await this.database<AccountSnakeCase>('accounts')
      .where('email', loginInput.email)
      .first();

    if (!account) throwLoginError();

    const isCorrectPassword = await compare(loginInput.password, account.password);
    if (!isCorrectPassword) throwLoginError();

    const response = {
      token: generateAuthToken(account),
    } as Login;

    return response;
  }
}

export default new LoginModel();
