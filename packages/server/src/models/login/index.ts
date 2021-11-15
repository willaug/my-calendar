import { Knex } from 'knex';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AccountSnackCase, Login } from '@interfaces/index';
import myCalendarDatabase from '@core/database';
import { ApolloError } from 'apollo-server-express';

function generateToken(account: AccountSnackCase): string {
  const secretKey = process.env.ACCESS_TOKEN || '1234';
  const options = { expiresIn: process.env.EXPIRATION_TOKEN || '3h' };
  const payload = {
    id: account.id,
    email: account.email,
  };

  return sign(payload, secretKey, options);
}

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
