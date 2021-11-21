import { generateToken } from '@core/functions/generate-token';

delete process.env.ACCESS_TOKEN;
delete process.env.EXPIRATION_TOKEN;

export const token = generateToken({
  id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
  name: 'William Augusto',
  email: 'william@example.com',
});

export const incorrectToken = generateToken({
  id: '8724c4b4-c123-52d5-bfce-305793a0bb8f',
  name: 'William Augusto',
  email: 'william@example.com',
});
