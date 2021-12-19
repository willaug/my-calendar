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
        throw new UserInputError('Field newPassword is different from confirmNewPassword');
      }

      return models.Accounts.updatePassAccount({ passAccountInput, authAccount });
    },
  },
  Account: {
    photoPath: ({ photo_path }: AccountSnackCase) => photo_path,
    createdAt: ({ created_at }: AccountSnackCase) => created_at,
    updatedAt: ({ updated_at }: AccountSnackCase) => updated_at,
  },
};
