import {
  ReminderSnakeCase,
  AccountSnakeCase,
  Account,
  Context,
  Input,
} from '@core/interfaces/index';
import { UserInputError } from 'apollo-server-express';
import myCalendarDatabase from '@core/database';

export default {
  Query: {
    account: (_: any, __: any, { models, authAccount }: Context): Account => {
      return models.Accounts.account({ authAccount });
    },
  },
  Mutation: {
    createAccount: (_: any, { accountInput }: Input, { models }: Context): Account => {
      return models.Accounts.createAccount({ accountInput });
    },
    updateAccount: (_: any, { accountInput }: Input, { models, authAccount }: Context): Account => {
      return models.Accounts.updateAccount({ accountInput, authAccount });
    },
    updatePassAccount: (_: any, { passAccountInput }: Input, { models, authAccount }: Context): Account => {
      if (passAccountInput.newPassword !== passAccountInput.confirmNewPassword) {
        throw new UserInputError('field newPassword is different from confirmNewPassword');
      }

      return models.Accounts.updatePassAccount({ passAccountInput, authAccount });
    },
    uploadPhotoAccount: (_: any, { photoAccountInput }: Input, { models, authAccount }: Context): Account => {
      return models.Accounts.uploadPhotoAccount({ photoAccountInput, authAccount });
    },
    deletePhotoAccount: (_: any, __: Input, { models, authAccount }: Context): Account => {
      return models.Accounts.deletePhotoAccount({ authAccount });
    },
  },
  Account: {
    createdAt: ({ created_at }: AccountSnakeCase) => created_at,
    updatedAt: ({ updated_at }: AccountSnakeCase) => updated_at,
    photoPath: ({ photo_path }: AccountSnakeCase) => {
      if (!photo_path) return null;
      return `${process.env.HOST_URL}/images/accounts/${photo_path}`;
    },
    reminders: ({ id }: AccountSnakeCase) => {
      return myCalendarDatabase<ReminderSnakeCase>('reminders')
        .where('account_id', id)
        .orderBy('scheduled_to', 'desc')
        .offset(0)
        .limit(100);
    },
  },
};
