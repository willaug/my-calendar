import { Knex } from 'knex';

const upTriggerUpdatedAt = `
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS trigger AS $$
  BEGIN 
    NEW.updated_at = now();
    RETURN NEW;
  END;
  $$ language 'plpgsql'
`;

const downTriggerUpdatedAt = `
  DROP FUNCTION on_update_timestamp()
`;

export function up(knex: Knex): Promise<void> {
  return knex.raw(upTriggerUpdatedAt);
}

export function down(knex: Knex): Promise<void> {
  return knex.raw(downTriggerUpdatedAt);
}
