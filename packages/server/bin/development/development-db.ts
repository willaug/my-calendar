import { green, red, yellow } from 'chalk';
import { Client } from 'pg';
import knex from '@core/database';
import { development } from '@core/database/config';

export default async function developmentDb(): Promise<void> {
  const { connection } = development;
  const connectionDevelopmentURL = `postgres://${connection.user}:${connection.password}@${connection.host}/postgres`;
  const client = new Client(connectionDevelopmentURL);

  try {
    await client.connect();

    await client.query(`DROP DATABASE IF EXISTS ${connection.database};`);
    await client.query(`CREATE DATABASE ${connection.database};`);

    console.log(`[${yellow('DEVELOPMENT')}] ${green(connection.database)} database was created!`);

    const migrations = await knex.migrate.latest();
    console.log(`[${yellow('DEVELOPMENT')}] ${green(migrations[1].length)} migration(s) changed the database!`);

    const seeds = await knex.seed.run();
    console.log(`[${yellow('DEVELOPMENT')}] ${green(seeds[0].length)} seed(s) inserted into the database!`);
  } catch (err) {
    console.log(red(err));
  } finally {
    await client.end();
    await knex.destroy();
  }
}
