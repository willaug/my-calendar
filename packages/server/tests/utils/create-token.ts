import { generateToken } from '@core/functions/token/generate-token';

delete process.env.ACCESS_TOKEN;
delete process.env.EXPIRATION_TOKEN;

export const correctWillAugToken = `Bearer ${generateToken({
  id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
  name: 'William Augusto',
  email: 'william@example.com',
})}`;

export const correctWillDoeToken = `Bearer ${generateToken({
  id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
  name: 'William Doe',
  email: 'will@example.com',
})}`;

export const incorretWillAugToken = `Bearer ${generateToken({
  id: '8724c4b4-c123-52d5-bfce-305793a0bb8f',
  name: 'William Augusto',
  email: 'william@example.com',
})}`;

export const incorretWillAugTokenWithoutId = `Bearer ${generateToken({
  name: 'William Augusto',
  email: 'william@example.com',
})}`;
