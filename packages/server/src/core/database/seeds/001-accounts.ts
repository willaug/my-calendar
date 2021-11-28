import { Knex } from 'knex';
import { hash } from 'bcrypt';
import dotEnv from 'dotenv';

dotEnv.config({ path: `${__dirname}/../../../../.env` });
export async function seed(knex: Knex): Promise<void> {
  await knex('accounts').del();
  await knex('accounts').insert([
    {
      id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
      name: 'William Augusto',
      email: 'william@example.com',
      password: await hash('1234', Number(process.env.HASH_SALT) || 10),
    },
    {
      id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
      name: 'William Doe',
      email: 'will@example.com',
      password: await hash('example', Number(process.env.HASH_SALT) || 10),
    },
  ]);
}
