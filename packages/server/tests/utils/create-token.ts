import { generateAuthToken } from '@core/functions/token/generate-token';
import { Account } from '@interfaces/account';
import { sign } from 'jsonwebtoken';

delete process.env.ACCESS_AUTH_TOKEN;
delete process.env.EXPIRATION_AUTH_TOKEN;

function authTestToken(variables: Account): string {
  return `Bearer ${generateAuthToken(variables)}`;
}

function authTestTokenWithoutData(): string {
  return sign({}, '1234');
}

export const correctWillAugToken = authTestToken({
  id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
  name: 'William Augusto',
  email: 'william@example.com',
});

export const correctWillDoeToken = authTestToken({
  id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
  name: 'William Doe',
  email: 'will@example.com',
});

export const incorretWillAugToken = authTestToken({
  id: '8724c4b4-c123-52d5-bfce-305793a0bb8f',
  name: 'William Augusto',
  email: 'william@example.com',
});

export const incorretWillAugTokenWithoutId = authTestToken({
  name: 'William Augusto',
  email: 'william@example.com',
});

export const incorrectTokenWithoutData = `Bearer ${authTestTokenWithoutData()}`;
