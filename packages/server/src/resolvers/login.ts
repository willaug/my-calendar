import { Login } from '@interfaces/index';

export default {
  Mutation: {
    login: (parent: any, { loginInput }: any, { models }: any): Login => {
      return models.Login.authenticate({ loginInput });
    },
  },
};
