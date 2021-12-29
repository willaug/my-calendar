import { gql } from 'apollo-server-express';

export default gql`
  input CreateAccountInput {
    name: String!
    email: Email!
    password: String!
    language: AccountLanguageEnum
  }

  input UpdateAccountInput {
    name: String
    email: Email
    language: AccountLanguageEnum
  }

  input UpdatePassAccountInput {
    currentPassword: String!
    newPassword: String!
    confirmNewPassword: String!
  }
`;
