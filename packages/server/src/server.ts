import remindersNotification from '@core/functions/emails/reminders-notification';
import { blue, red, yellow } from 'chalk';
import App from './app';

class Server extends App {
  public constructor() {
    super();
    this.startServer();
  }

  private startServer(): void {
    this.express.listen(this.hostPort, () => {
      console.clear();

      if (process.env.NODE_ENV !== 'production') {
        console.log(`[${blue('DEVELOPMENT')}] MyCalendar API is running on ${blue(this.host)}`);
        return;
      }

      setTimeout((): void => {
        remindersNotification()
          .catch((err: unknown) => {
            console.log(`[${red('ERROR')}] ${red(JSON.stringify(err))}`);
          });
      }, 1000 * 60 * 60);

      console.log(`[${yellow('PRODUCTION')}] MyCalendar API is running on ${yellow(this.host)}`);
    });
  }
}

export default new Server();
