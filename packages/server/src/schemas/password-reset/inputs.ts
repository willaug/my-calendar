import { gql } from 'apollo-server-express';

export default gql`
  input CreatePasswordResetInput {
    email: Email!
    ip: IP!
  }

  input UpdatePasswordResetInput {
    token: Token!
    newPassword: String!
    confirmNewPassword: String!
    ip: IP!
  }
`;
