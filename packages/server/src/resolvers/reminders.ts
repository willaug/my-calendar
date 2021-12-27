import {
  Reminders,
  Reminder,
  ReminderSnackCase,
  Context,
  Input,
} from '@interfaces/index';
import { ApolloError } from 'apollo-server-express';
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
    fullDay: ({ full_day }: ReminderSnackCase) => full_day,
    createdAt: ({ created_at }: ReminderSnackCase) => created_at,
    updatedAt: ({ updated_at }: ReminderSnackCase) => updated_at,
    scheduledTo: ({ scheduled_to }: ReminderSnackCase) => scheduled_to,
    rememberEmail: ({ remember_email }: ReminderSnackCase) => remember_email,
    reminderColor: ({ reminder_color }: ReminderSnackCase) => reminder_color,
  },
};
