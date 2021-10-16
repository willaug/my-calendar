import { Client } from 'pg';
import { yellow, green, red } from 'chalk';
import { development } from '../config';

const createDb = async () => {
  const { connection } = development;
  const connectionDevelopmentURL = `postgres://${connection.user}:${connection.password}@${connection.host}/postgres`;
  const client = new Client(connectionDevelopmentURL);

  try {
    await client.connect();

    await client.query(`DROP DATABASE IF EXISTS ${connection.database};`);
    await client.query(`CREATE DATABASE  ${connection.database};`);

    console.clear();
    console.log(`[${yellow('DEVELOPMENT')}] ${green(connection.database)} database was created!`);
  } catch (err) {
    console.log(red(err));
  } finally {
    await client.end();
  }
};

createDb();
