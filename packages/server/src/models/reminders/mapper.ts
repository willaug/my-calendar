import { ReminderSnakeCase, Reminder, RemindersQueryConditions } from '@interfaces/index';
import { snakeCase } from 'change-case';

function repeatToSnakeCase(repeat: any): string | undefined {
  return repeat ? snakeCase(repeat) : undefined;
}

class RemindersMapper {
  public static toCreateReminder({ reminder, accountId }): ReminderSnakeCase {
    return {
      title: reminder.title,
      repeat: repeatToSnakeCase(reminder.repeat),
      full_day: reminder.fullDay,
      account_id: accountId,
      description: reminder.description,
      scheduled_to: reminder.scheduledTo,
      remember_email: reminder.rememberEmail,
      reminder_color: reminder.reminderColor,
    };
  }

  public static toUpdateReminder(reminder: Reminder): ReminderSnakeCase {
    return {
      title: reminder.title,
      repeat: repeatToSnakeCase(reminder.repeat),
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
      const keyInSnakeCaseArr = snakeCase(key).split('_');
      const keyCondition = keyInSnakeCaseArr[keyInSnakeCaseArr.length - 1];
      const keyInSnakeCase = keyInSnakeCaseArr.join('_').replace(`_${keyCondition}`, '');

      if (keyCondition === 'like') builder.where(keyInSnakeCase, 'like', `%${value}%`);
      if (keyCondition === 'in') builder.whereIn(keyInSnakeCase, value);
      if (keyCondition === 'equal') builder.where(keyInSnakeCase, value);
      if (keyCondition === 'start') builder.where(keyInSnakeCase, '>=', value);
      if (keyCondition === 'end') builder.where(keyInSnakeCase, '<=', value);
    });

    return builder;
  }
}

export default RemindersMapper;
