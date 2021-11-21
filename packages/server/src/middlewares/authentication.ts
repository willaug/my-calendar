import { AuthenticationError, ExpressContext } from 'apollo-server-express';
import { AccountSnackCase, AuthAccount, AuthJwtPayload } from '@interfaces/index';
import { verify } from 'jsonwebtoken';
import database from '@core/database';

export default async function auth({ req }: ExpressContext | any): Promise<void | AuthAccount> {
  try {
    const { authorization } = req.headers;

    const token = authorization && authorization.split(/\s/)[1];
    const secretKey = process.env.ACCESS_TOKEN || '1234';

    const decoded = verify(token, secretKey) as AuthJwtPayload;
    const account = await database<AccountSnackCase>('accounts')
      .where('id', decoded.id)
      .first();

    return {
      id: account.id,
    } as AuthAccount;
  } catch {
    throw new AuthenticationError('Account not authenticated');
  }
}
