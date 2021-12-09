import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('password_reset').del();
  await knex('password_reset').insert([
    {
      account_id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
      token: 'xinFxacWT3VSu60MK45iN6gpLg3j3a',
      used: false,
      solicited_by: {},
    },
    {
      account_id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
      token: '3CkXFClH1GP6ewF',
      used: false,
      solicited_by: {},
      created_at: '2021-12-09T01:01:38.128Z',
      updated_at: '2021-12-09T01:01:38.128Z',
      expires_at: '2021-12-09T01:01:40.128Z',
    },
    {
      account_id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
      token: 'fuT1iU2hLxe9jJ0HN',
      used: true,
      solicited_by: {},
      created_at: '2021-12-09T01:01:38.128Z',
      updated_at: '2021-12-09T01:01:38.128Z',
      expires_at: '2021-12-09T01:01:40.128Z',
    },
  ]);
}
