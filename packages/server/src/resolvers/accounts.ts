import {
  Account,
  AccountSnackCase,
  Context,
  Input,
} from '@interfaces/index';

export default {
  Mutation: {
    createAccount: (_: any, { accountInput }: Input, { models }: Context): Account => {
      return models.Accounts.createAccount({ accountInput });
    },
    updateAccount: (_: any, { accountInput }: Input, { models, authAccount }: Context): Account => {
      return models.Accounts.updateAccount({ accountInput, authAccount });
    },
  },
  Account: {
    photoPath: ({ photo_path }: AccountSnackCase) => photo_path,
    createdAt: ({ created_at }: AccountSnackCase) => created_at,
    updatedAt: ({ updated_at }: AccountSnackCase) => updated_at,
  },
};
