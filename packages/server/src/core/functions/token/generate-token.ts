import { AccountSnackCase } from '@interfaces/index';
import { sign } from 'jsonwebtoken';

export function generateAuthToken(account: AccountSnackCase): string {
  const secretKey = process.env.ACCESS_AUTH_TOKEN || '1234';
  const options = { expiresIn: process.env.EXPIRATION_AUTH_TOKEN || '3h' };
  const payload = {
    account_id: account.id,
    purpose: 'AUTHENTICATION',
  };

  return sign(payload, secretKey, options);
}

export function generatePasswordResetToken(): string {
  const secretKey = process.env.ACCESS_PASSWORD_RESET_TOKEN || '123456';
  const options = { expiresIn: process.env.EXPIRATION_PASSWORD_RESET_TOKEN || '8h' };
  const payload = {
    purpose: 'PASSWORD_RESET',
  };

  return sign(payload, secretKey, options);
}
