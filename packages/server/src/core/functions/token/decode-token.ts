import { ExpressContext } from 'apollo-server-express';
import { AuthAccount } from '@interfaces/index';
import { decode } from 'jsonwebtoken';

async function decodeToken({ req }: ExpressContext | any): Promise<null | AuthAccount> {
  try {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(/\s/)[1];

    const decoded = decode(token) as AuthAccount;
    if (decoded.account_id && decoded.purpose === 'AUTHENTICATION') {
      return {
        account_id: decoded.account_id,
        purpose: decoded.purpose,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export default decodeToken;
