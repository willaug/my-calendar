import { ReminderSnackCase } from '@interfaces/index';

class RemindersMapper {
  public static toCreateReminder({ reminder, accountId }): ReminderSnackCase {
    return {
      title: reminder.title,
      repeat: reminder.repeat,
      full_day: reminder.fullDay,
      account_id: accountId,
      description: reminder.description,
      scheduled_to: reminder.scheduledTo,
      remember_email: reminder.rememberEmail,
      reminder_color: reminder.reminderColor,
    };
  }
}

export default RemindersMapper;
