import { red } from 'chalk';
import createPublicDirectory from './create-files-directory';
import developmentDb from './development-db';

const run = async (): Promise<void> => {
  console.clear();

  try {
    await createPublicDirectory();
    await developmentDb();
  } catch (err) {
    console.log(red(err));
  }
};

run();
