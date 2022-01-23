import {
  ReminderSnakeCase,
  Reminders,
  Reminder,
  Context,
  Input,
} from '@interfaces/index';
import { ApolloError } from 'apollo-server-express';
import { camelCase } from 'change-case';
import moment from 'moment';

function scheduledToIsBeforeNowErr(scheduledTo: Date): void {
  if (scheduledTo && moment(scheduledTo).isBefore(moment())) {
    throw new ApolloError(
      'scheduledTo is before now',
      'SCHEDULED_TO_IS_BEFORE_NOW',
    );
  }
}

export default {
  Query: {
    reminders: (_: any, { queryRemindersInput }: Input, { models, authAccount }: Context): Reminders => {
      return models.Reminders.reminders({ queryRemindersInput: queryRemindersInput || {}, authAccount });
    },

    reminder: (_: any, { queryReminderInput }: Input, { models, authAccount }: Context): Reminder => {
      return models.Reminders.reminder({ queryReminderInput, authAccount });
    },
  },
  Mutation: {
    createReminder: (_: any, { createReminderInput }: Input, { models, authAccount }: Context): Reminder => {
      scheduledToIsBeforeNowErr(createReminderInput.scheduledTo);
      return models.Reminders.createReminder({ createReminderInput, authAccount });
    },
    updateReminder: (_: any, { updateReminderInput }: Input, { models, authAccount }: Context): Reminder => {
      scheduledToIsBeforeNowErr(updateReminderInput.scheduledTo);
      return models.Reminders.updateReminder({ updateReminderInput, authAccount });
    },
  },
  Reminder: {
    fullDay: ({ full_day }: ReminderSnakeCase) => full_day,
    createdAt: ({ created_at }: ReminderSnakeCase) => created_at,
    updatedAt: ({ updated_at }: ReminderSnakeCase) => updated_at,
    scheduledTo: ({ scheduled_to }: ReminderSnakeCase) => scheduled_to,
    rememberEmail: ({ remember_email }: ReminderSnakeCase) => remember_email,
    reminderColor: ({ reminder_color }: ReminderSnakeCase) => reminder_color,
    repeat: ({ repeat }: ReminderSnakeCase) => camelCase(String(repeat)),
  },
};
