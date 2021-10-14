import { Knex } from 'knex';
import dotEnv from 'dotenv';

dotEnv.config({ path: '../../../.env' });

const development: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST_DEV || '127.0.0.1',
    port: Number(process.env.DB_PORT_DEV) || 5432,
    database: process.env.DB_NAME || 'my_calendar',
    user: process.env.DB_USER_DEV || 'postgres',
    password: process.env.DB_PASS_DEV || null,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
};

export {
  development,
};
