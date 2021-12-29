/* eslint-disable no-param-reassign */
import { ReminderAndAccountSnackCase } from '@core/interfaces/index';
import { sendEmail } from '@core/functions/emails/send-email';
import moment from 'moment';
import database from '@core/database';
import english from './templates/reminders-notification/i18n/english';
import portuguese from './templates/reminders-notification/i18n/portuguese';
import translate from '../utils/translate';

export default async function remindersNotification(): Promise<any> {
  try {
    const unnotifiedReminders = await database<ReminderAndAccountSnackCase>('reminders')
      .select(
        'reminders.*',
        'accounts.name as account_name',
        'accounts.email as account_email',
        'accounts.language as account_language',
      )
      .leftJoin('accounts', 'accounts.id', 'reminders.account_id')
      .where('reminders.remembered', false)
      .andWhere('reminders.archived', false)
      .andWhere('reminders.remember_email', true)
      .andWhere('reminders.scheduled_to', '>=', moment())
      .andWhere('reminders.scheduled_to', '<=', moment().add(5, 'hours'));

    unnotifiedReminders.forEach(async (reminder: ReminderAndAccountSnackCase) => {
      const translatedData = translate({
        lang: reminder.account_language,
        langData: {
          portuguese,
          english,
        },
      });

      reminder.scheduled_time = moment(reminder.scheduled_to).format('HH:mm');
      reminder.scheduled_date = reminder.account_language === 'pt_br'
        ? moment(reminder.scheduled_to).format('DD/MM/YY')
        : moment(reminder.scheduled_to).format('MM/DD/YY');

      await sendEmail({
        fromEmail: process.env.NOTIFICATION_FROM_EMAIL_ADDRESS || 'notifications@mycalendar.com',
        title: reminder.title.charAt(0).toUpperCase() + reminder.title.slice(1),
        toEmail: reminder.account_email,
        template: {
          path: '/reminders-notification/reminder-notification.ejs',
          variables: {
            reminder,
            translatedData,
          },
        },
      });

      await database<ReminderAndAccountSnackCase>('reminders')
        .where('id', reminder.id)
        .update('remembered', true);
    });

    return {
      message: 'success',
      remindersCalled: unnotifiedReminders.length,
    };
  } catch (err) {
    /* istanbul ignore next */
    return {
      err,
    };
  }
}
