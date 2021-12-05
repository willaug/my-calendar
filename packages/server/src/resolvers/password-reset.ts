import { Context, Input } from '@interfaces/index';
import { ApolloError } from 'apollo-server-express';

export default {
  Mutation: {
    createPasswordReset: (_: any, { passwordResetInput }: Input, { models, req }: Context): void => {
      const userAgent = req.headers['user-agent'];
      const [lang] = req.acceptsLanguages();

      if (!userAgent) {
        throw new ApolloError(
          'header user-agent not provided',
          'USER_AGENT_NOT_PROVIDED',
        );
      }

      if (lang === '*') {
        throw new ApolloError(
          'header accept-language not provided',
          'ACCEPT_LANGUAGE_NOT_PROVIDED',
        );
      }

      return models.PasswordReset.createPasswordReset({ lang, passwordResetInput, userAgent });
    },
  },
};
