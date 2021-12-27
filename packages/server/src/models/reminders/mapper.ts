import { ReminderSnackCase, Reminder, RemindersQueryConditions } from '@interfaces/index';
import { snakeCase } from 'change-case';

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

  public static toUpdateReminder(reminder: Reminder): ReminderSnackCase {
    return {
      title: reminder.title,
      repeat: reminder.repeat,
      full_day: reminder.fullDay,
      description: reminder.description,
      scheduled_to: reminder.scheduledTo,
      remember_email: reminder.rememberEmail,
      reminder_color: reminder.reminderColor,
      archived: reminder.archived,
    };
  }

  public static toQueryConditions(builder: any, conditions: RemindersQueryConditions): any {
    Object.entries(conditions).forEach(([key, value]: any[]) => {
      const keyInSnackCaseArr = snakeCase(key).split('_');
      const keyCondition = keyInSnackCaseArr[keyInSnackCaseArr.length - 1];
      const keyInSnackCase = keyInSnackCaseArr.join('_').replace(`_${keyCondition}`, '');

      if (keyCondition === 'like') builder.where(keyInSnackCase, 'like', `%${value}%`);
      if (keyCondition === 'in') builder.whereIn(keyInSnackCase, value);
      if (keyCondition === 'equal') builder.where(keyInSnackCase, value);
      if (keyCondition === 'start') builder.where(keyInSnackCase, '>=', value);
      if (keyCondition === 'end') builder.where(keyInSnackCase, '<=', value);
    });

    return builder;
  }
}

export default RemindersMapper;
