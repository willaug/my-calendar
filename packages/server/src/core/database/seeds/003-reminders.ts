import { Knex } from 'knex';
import moment from 'moment';

export async function seed(knex: Knex): Promise<void> {
  await knex('reminders').del();
  await knex('reminders').insert([
    {
      id: '18f5b04a-631d-54bb-9839-aea9fa8079d0',
      account_id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
      title: 'Renovar passaporte',
      description: 'Lembrar de renovar!',
      scheduled_to: moment().add(1, 'days'),
      full_day: false,
    },
    {
      id: '4923e408-b524-5e35-8dd7-bb55a296ca82',
      account_id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
      title: 'Comprar pão',
      scheduled_to: moment().add(1, 'days'),
      repeat: 'every_monday',
      archived: true,
      full_day: false,
      remember_email: true,
      reminder_color: '#548790',
    },
    {
      id: 'c646fd10-9953-5bd7-8005-d5e122a963f8',
      account_id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
      title: 'Consulta médica',
      scheduled_to: moment().add(1, 'days'),
    },
    {
      id: 'c4ce88bc-186e-5219-a930-4189b76a7713',
      account_id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
      title: 'Consulta odontológica',
      description: 'Consulta com o Dr. Silva',
      scheduled_to: '2021-02-10T07:17:36.000Z',
      reminder_color: '#9087e3',
    },
    {
      id: '4e4365df-4b11-5d33-96cf-69a335068f7c',
      account_id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
      title: 'Revisão do carro',
      remember_email: true,
      scheduled_to: moment().add(2, 'hours'),
    },
    {
      id: 'd65f3f61-cf10-584d-a192-7c3fdb51d270',
      account_id: 'e89b29c6-086a-581b-bdde-a5c09c1687bc',
      title: 'Consulta médica',
      description: 'Consulta médica com o Dr. Marcos',
      scheduled_to: moment().add(3, 'hours'),
      remember_email: true,
      reminder_color: '#9087e3',
    },
    {
      id: '6057268e-f91f-5620-a474-4b30ab53a7a6',
      account_id: 'e89b29c6-086a-581b-bdde-a5c09c1687bc',
      title: 'Pagamento de multa',
      remember_email: true,
      full_day: false,
      scheduled_to: moment().add(4, 'hours'),
    },
  ]);
}
