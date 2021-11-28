import { AccountSnackCase } from '@interfaces/index';
import { sign } from 'jsonwebtoken';

export function generateToken(account: AccountSnackCase): string {
  const secretKey = process.env.ACCESS_TOKEN || '1234';
  const options = { expiresIn: process.env.EXPIRATION_TOKEN || '3h' };
  const payload = { id: account.id };

  return sign(payload, secretKey, options);
}
