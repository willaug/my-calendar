import { Login, Input, Context } from '@interfaces/index';

export default {
  Mutation: {
    login: (_: any, { loginInput }: Input, { models }: Context): Login => {
      return models.Login.authenticate({ loginInput });
    },
  },
};
