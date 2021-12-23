import { UserInputError } from 'apollo-server-express';
import {
  Account,
  AccountSnackCase,
  Context,
  Input,
} from '@interfaces/index';

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
  },
  Account: {
    createdAt: ({ created_at }: AccountSnackCase) => created_at,
    updatedAt: ({ updated_at }: AccountSnackCase) => updated_at,
    photoPath: ({ photo_path }: AccountSnackCase) => {
      if (!photo_path) return null;
      return `${process.env.HOST_URL}/images/accounts/${photo_path}`;
    },
  },
};
