import { Knex } from 'knex';
import { development } from '../config';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('password_reset', (table: Knex.TableBuilder) => {
    table.increments();
    table.uuid('account_id').references('id').inTable('accounts')
      .onUpdate('cascade')
      .onDelete('cascade')
      .notNullable();
    table.string('token').unique().notNullable();
    table.boolean('used').notNullable().defaultTo(false);
    table.jsonb('solicited_by').notNullable();
    table.jsonb('updated_by');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.raw(development.onUpdateTrigger('password_reset'));
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('password_reset');
}
