// eslint-disable-next-line import/no-extraneous-dependencies
import { date } from 'faker';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('reminders').del();
  await knex('reminders').insert([
    {
      id: '18f5b04a-631d-54bb-9839-aea9fa8079d0',
      account_id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
      title: 'Renovar passaporte',
      description: 'Lembrar de renovar!',
      scheduled_to: date.future(),
      full_day: false,
    },
    {
      id: '4923e408-b524-5e35-8dd7-bb55a296ca82',
      account_id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
      title: 'Comprar pão',
      scheduled_to: date.future(),
      repeat: true,
      archived: true,
      full_day: false,
      remember_email: true,
      reminder_color: '#548790',
    },
    {
      id: 'c646fd10-9953-5bd7-8005-d5e122a963f8',
      account_id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
      title: 'Consulta médica',
      scheduled_to: date.future(),
    },
    {
      id: 'c4ce88bc-186e-5219-a930-4189b76a7713',
      account_id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
      title: 'Consulta odontológica',
      description: 'Consulta com o Dr. Silva',
      scheduled_to: '2021-02-10T07:17:36.000Z',
      reminder_color: '#9087e3',
    },
  ]);
}
