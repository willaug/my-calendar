import { AuthenticationError, ExpressContext, SchemaDirectiveVisitor } from 'apollo-server-express';
import { AccountSnackCase, AuthAccount } from '@interfaces/index';
import { verify } from 'jsonwebtoken';
import database from '@core/database';
import { GraphQLField } from 'graphql';

async function auth({ req }: ExpressContext | any): Promise<boolean> {
  try {
    const { authorization } = req.headers;

    const token = authorization && authorization.split(/\s/)[1];
    const secretKey = process.env.ACCESS_TOKEN || '1234';

    const decoded = verify(token, secretKey) as AuthAccount;
    const account = await database<AccountSnackCase>('accounts')
      .where('id', decoded.id)
      .first();

    return Boolean(account);
  } catch {
    return false;
  }
}

class AuthenticationDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>): void {
    const { resolve } = field;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async (...args: any[]) => {
      const authenticated = await auth({ req: args[2].req });

      if (authenticated) {
        return resolve.apply(this, args);
      }

      throw new AuthenticationError('Account not authenticated');
    };
  }
}

export default AuthenticationDirective;
