import { green, yellow } from 'chalk';
import { mkdirSync, rmSync } from 'fs';

export default async function createPublicDirectory(): Promise<void> {
  const directory = `${__dirname}/../../public`;

  console.log(`[${yellow('DEVELOPMENT')}] ${green('files')} directory was created!`);

  rmSync(directory, { recursive: true });
  mkdirSync(directory, { recursive: true });
  mkdirSync(`${directory}/images`, { recursive: true });
  mkdirSync(`${directory}/images/accounts`, { recursive: true });
}
