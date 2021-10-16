import { Knex } from 'knex';
import { development } from '../config';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('accounts', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('photo_path').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.raw(development.onUpdateTrigger('accounts'));
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('accounts');
}
