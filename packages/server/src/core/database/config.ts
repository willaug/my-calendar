import dotEnv from 'dotenv';

dotEnv.config({ path: `${__dirname}/../../../.env` });

const development = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST_DEV || '127.0.0.1',
    port: Number(process.env.DB_PORT_DEV) || 5432,
    database: process.env.DB_NAME || 'my_calendar',
    user: process.env.DB_USER_DEV || 'postgres',
    password: process.env.DB_PASS_DEV || null,
    charset: process.env.DB_CHARSET_DEV || 'UTF-8',
    timezone: process.env.DB_TZ_DEV || 'UTC',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
  onUpdateTrigger: (table: String) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();`,
};

export {
  development,
};
