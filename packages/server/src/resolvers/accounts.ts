import { Account } from '@interfaces/index';

export default {
  Mutation: {
    createAccount: (parent: any, { accountInput }: any, { models }: any): Account => {
      return models.Accounts.createAccount({ accountInput });
    },
  },
  Account: {
    photoPath: ({ photo_path }: any) => photo_path,
    createdAt: ({ created_at }: any) => created_at,
    updatedAt: ({ updated_at }: any) => updated_at,
  },
};
