import { red } from 'chalk';

export default function printError(response: any): void {
  if (response.body && response.body.errors) {
    const message = red(JSON.stringify(response.body.errors, null, 2));
    console.log(message);
  }
}
