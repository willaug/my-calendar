import { blue, yellow } from 'chalk';
import App from './app';

class Server extends App {
  public constructor() {
    super();
    this.startServer();
  }

  private startServer(): void {
    this.express.listen(this.hostPort, () => {
      console.clear();

      if (process.env.ENVIRONMENT === 'prod') {
        console.log(`[${yellow('PRODUCTION')}] MyCalendar API is running on ${yellow(this.host)}`);
        return;
      }

      console.log(`[${blue('DEVELOPMENT')}] MyCalendar API is running on ${blue(this.host)}`);
    });
  }
}

export default new Server();
