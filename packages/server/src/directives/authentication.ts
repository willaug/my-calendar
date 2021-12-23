import { AuthenticationError, ExpressContext } from 'apollo-server-express';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { AccountSnackCase, AuthAccount } from '@interfaces/index';
import { GraphQLFieldConfig, GraphQLSchema } from 'graphql';
import { verify } from 'jsonwebtoken';
import database from '@core/database';

async function auth({ req }: ExpressContext | any): Promise<boolean> {
  try {
    const { authorization } = req.headers;

    const token = authorization && authorization.split(/\s/)[1];
    const secretKey = process.env.ACCESS_AUTH_TOKEN || '1234';

    const decoded = verify(token, secretKey) as AuthAccount;
    if (!decoded.account_id || !decoded.solicited_at || decoded.purpose !== 'AUTHENTICATION') {
      return false;
    }

    const account = await database<AccountSnackCase>('accounts')
      .where('id', decoded.account_id)
      .first();

    return Boolean(account);
  } catch {
    return false;
  }
}

export default function authentication(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig: GraphQLFieldConfig<any, any, any>) => {
      const authDirective = getDirective(schema, fieldConfig, 'isAuthenticated')?.[0];

      if (authDirective) {
        const { resolve } = fieldConfig;

        // eslint-disable-next-line no-param-reassign
        fieldConfig.resolve = async (...args: any[]) => {
          const authenticated = await auth({ req: args[2].req });

          if (authenticated) {
            return resolve.apply(this, args);
          }

          throw new AuthenticationError('Account not authenticated');
        };
      }

      return fieldConfig;
    },
  });
}
