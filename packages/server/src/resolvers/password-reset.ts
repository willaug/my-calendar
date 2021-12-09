import { Context, Input } from '@interfaces/index';
import { ApolloError, UserInputError } from 'apollo-server-express';

function verifyHeaders(userAgent: string, lang: string): void {
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
}

export default {
  Mutation: {
    createPasswordReset: (_: any, { passwordResetInput }: Input, { models, req }: Context): void => {
      const userAgent = req.headers['user-agent'];
      const [lang] = req.acceptsLanguages();
      verifyHeaders(userAgent, lang);

      return models.PasswordReset.createPasswordReset({ lang, passwordResetInput, userAgent });
    },
    updatePasswordReset: (_: any, { passwordResetInput }: Input, { models, req }: Context): void => {
      const userAgent = req.headers['user-agent'];
      const [lang] = req.acceptsLanguages();
      verifyHeaders(userAgent, lang);

      if (passwordResetInput.newPassword !== passwordResetInput.confirmNewPassword) {
        throw new UserInputError('Field newPassword is different from confirmNewPassword');
      }

      return models.PasswordReset.updatePasswordReset({ lang, passwordResetInput, userAgent });
    },
  },
};
