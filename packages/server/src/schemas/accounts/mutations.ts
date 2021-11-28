import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createAccount(accountInput: CreateAccountInput): Account!
    updateAccount(accountInput: UpdateAccountInput): Account! @authentication
    updatePassAccount(passAccountInput: UpdatePassAccountInput): Account! @authentication
  }
`;
