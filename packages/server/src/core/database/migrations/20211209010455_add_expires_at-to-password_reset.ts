import { Knex } from 'knex';
import dotEnv from 'dotenv';

dotEnv.config({ path: `${__dirname}/../../../../.env` });
const hours = Number(process.env.PASSWORD_RESET_EXPIRES_AT_IN_HOURS) || 2;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('password_reset', (table: Knex.TableBuilder) => {
    table.timestamp('expires_at').notNullable()
      .defaultTo(knex.raw(`CURRENT_TIMESTAMP + INTERVAL '${hours} hours'`));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('password_reset', (table: Knex.TableBuilder) => {
    table.dropColumn('expires_at');
  });
}
