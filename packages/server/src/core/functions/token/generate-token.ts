import { AccountSnakeCase } from '@interfaces/index';
import { sign } from 'jsonwebtoken';

export function generateAuthToken(account: AccountSnakeCase): string {
  const secretKey = process.env.ACCESS_AUTH_TOKEN || '1234';
  const options = { expiresIn: process.env.EXPIRATION_AUTH_TOKEN || '3h' };
  const payload = {
    account_id: account.id,
    purpose: 'AUTHENTICATION',
    solicited_at: (new Date()).toISOString(),
  };

  return sign(payload, secretKey, options);
}
