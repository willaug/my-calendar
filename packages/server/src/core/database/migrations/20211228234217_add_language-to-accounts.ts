import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('accounts', (table: Knex.TableBuilder) => {
    table.enum('language', ['pt_br', 'en']).notNullable().defaultTo('en');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('accounts', (table: Knex.TableBuilder) => {
    table.dropColumn('language');
  });
}
