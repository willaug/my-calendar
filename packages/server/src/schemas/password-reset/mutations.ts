import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createPasswordReset(passwordResetInput: CreatePasswordResetInput!): PasswordReset!
    updatePasswordReset(passwordResetInput: UpdatePasswordResetInput!): PasswordReset!
  }
`;
