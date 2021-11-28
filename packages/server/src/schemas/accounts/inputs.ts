import { gql } from 'apollo-server-express';

export default gql`
  input CreateAccountInput {
    name: String!
    email: Email!
    password: String!
  }

  input UpdateAccountInput {
    name: String
    email: Email
  }

  input UpdatePassAccountInput {
    currentPassword: String!
    newPassword: String!
    confirmNewPassword: String!
  }
`;
