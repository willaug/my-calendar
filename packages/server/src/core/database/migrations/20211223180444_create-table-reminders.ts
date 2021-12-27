import { Knex } from 'knex';
import { development } from '../config';

export async function up(knex: Knex): Promise<void> {
  const repeatEnum = [
    'never',
    'every_day',
    'every_monday',
    'every_tuesday',
    'every_wednesday',
    'every_thursday',
    'every_friday',
    'every_saturday',
    'every_sunday',
  ];

  await knex.schema.createTable('reminders', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('account_id').references('id').inTable('accounts')
      .onUpdate('cascade')
      .onDelete('cascade')
      .notNullable();
    table.string('title', 70).notNullable();
    table.string('description', 200);
    table.enum('repeat', repeatEnum).notNullable().defaultTo('never');
    table.boolean('full_day').notNullable().defaultTo(true);
    table.boolean('archived').notNullable().defaultTo(false);
    table.boolean('remembered').notNullable().defaultTo(false);
    table.boolean('remember_email').notNullable().defaultTo(false);
    table.string('reminder_color').notNullable().defaultTo('#465FDB');
    table.timestamp('scheduled_to').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.raw(development.onUpdateTrigger('reminders'));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('reminders');
}
