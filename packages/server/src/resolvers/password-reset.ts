import { Context, Input } from '@interfaces/index';
import { ApolloError, UserInputError } from 'apollo-server-express';

function verifyHeaders(userAgent: string): void {
  if (!userAgent) {
    throw new ApolloError(
      'header user-agent not provided',
      'USER_AGENT_NOT_PROVIDED',
    );
  }
}

export default {
  Mutation: {
    createPasswordReset: (_: any, { passwordResetInput }: Input, { models, req }: Context): void => {
      const userAgent = req.headers['user-agent'];
      verifyHeaders(userAgent);

      return models.PasswordReset.createPasswordReset({ passwordResetInput, userAgent });
    },
    updatePasswordReset: (_: any, { passwordResetInput }: Input, { models, req }: Context): void => {
      const userAgent = req.headers['user-agent'];
      verifyHeaders(userAgent);

      if (passwordResetInput.newPassword !== passwordResetInput.confirmNewPassword) {
        throw new UserInputError('Field newPassword is different from confirmNewPassword');
      }

      return models.PasswordReset.updatePasswordReset({ passwordResetInput, userAgent });
    },
  },
};
