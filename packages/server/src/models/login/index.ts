import { Knex } from 'knex';
import { compare } from 'bcrypt';
import { AccountSnackCase, Login } from '@interfaces/index';
import myCalendarDatabase from '@core/database';
import { ApolloError } from 'apollo-server-express';
import { generateToken } from '@core/functions/generate-token';

function throwLoginError(): void {
  throw new ApolloError(
    'The email or password is incorrect',
    'EMAIL_OR_PASSWORD_INCORRECT',
  );
}

class LoginModel {
  public database: Knex;

  public constructor() {
    this.database = myCalendarDatabase;
  }

  public async authenticate({ loginInput }): Promise<Login | void> {
    const account = await this.database<AccountSnackCase>('accounts')
      .where('email', loginInput.email)
      .first();

    if (!account) throwLoginError();

    const isCorrectPassword = await compare(loginInput.password, account.password);
    if (!isCorrectPassword) throwLoginError();

    const response = {
      token: generateToken(account),
    } as Login;

    return response;
  }
}

export default new LoginModel();
