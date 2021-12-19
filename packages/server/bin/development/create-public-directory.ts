import { green, red, yellow } from 'chalk';
import { mkdirSync, rmdirSync } from 'fs';

export default async function createPublicDirectory(): Promise<void> {
  const directory = `${__dirname}/../../public`;

  try {
    console.log(`[${yellow('DEVELOPMENT')}] ${green('public')} directory recreated!`);

    rmdirSync(directory, { recursive: true });
    mkdirSync(directory, { recursive: true });
  } catch (err) {
    console.log(red(err));
  }
}
