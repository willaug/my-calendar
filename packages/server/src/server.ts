import { blue } from 'chalk';
import app from './app';

const hostPort = process.env.HOST_PORT || 4000;
app.listen(hostPort, () => {
  console.clear();
  console.log(`[${blue('RUNNING')}] MyCalendar API is running on ${blue(`http://localhost:${hostPort}`)}`);
});
