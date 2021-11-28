import { ExpressContext } from 'apollo-server-express';
import { AuthAccount } from '@interfaces/index';
import { decode } from 'jsonwebtoken';

async function decodeToken({ req }: ExpressContext | any): Promise<null | AuthAccount> {
  try {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(/\s/)[1];

    const decoded = decode(token) as AuthAccount;
    if (decoded.id) {
      return { id: decoded.id };
    }

    return null;
  } catch {
    return null;
  }
}

export default decodeToken;
