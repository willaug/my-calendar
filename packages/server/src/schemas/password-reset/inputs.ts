import { gql } from 'apollo-server-express';

export default gql`
  input CreatePasswordResetInput {
    email: Email!
    ip: IP!
  }

  input UpdatePasswordResetInput {
    token: String!
    newPassword: String!
    confirmNewPassword: String!
    ip: IP!
  }
`;
