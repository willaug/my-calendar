import { join } from 'path';
import { SendEmail } from '@interfaces/functions/send-email';
import { createTransport } from 'nodemailer';
import { renderFile } from 'ejs';

export async function sendEmail(data: SendEmail): Promise<any> {
  const path = join(__dirname, 'templates', data.template.path);
  const html = await renderFile(path, data.template.variables);

  const sendMailContent = {
    from: `MyCalendar <${data.fromEmail}>`,
    to: data.toEmail,
    subject: data.title,
    html,
  };

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'production') {
    const transporter = createTransport({
      host: process.env.TRANSPORT_HOST,
      port: Number(process.env.TRANSPORT_PORT),
      auth: {
        user: process.env.TRANSPORT_AUTH_USER,
        pass: process.env.TRANSPORT_AUTH_PASS,
      },
    });

    return transporter.sendMail(sendMailContent);
  }

  return sendMailContent;
}
