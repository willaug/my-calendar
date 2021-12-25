// eslint-disable-next-line import/no-extraneous-dependencies
import { date } from 'faker';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('reminders').del();
  await knex('reminders').insert({
    id: '18f5b04a-631d-54bb-9839-aea9fa8079d0',
    account_id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
    title: 'Renovar passaporte',
    description: 'Lembrar de renovar!',
    scheduled_to: date.future(),
    full_day: false,
  });
}
