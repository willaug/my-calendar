import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createAccount(accountInput: CreateAccountInput!): Account!
    updateAccount(accountInput: UpdateAccountInput!): Account! @isAuthenticated
    updatePassAccount(passAccountInput: UpdatePassAccountInput!): Account! @isAuthenticated
    uploadPhotoAccount(photoAccountInput: Upload!): Account! @isAuthenticated
    deletePhotoAccount: Account! @isAuthenticated
  }
`;
