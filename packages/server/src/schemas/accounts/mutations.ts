import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createAccount(accountInput: CreateAccountInput): Account!
    # updateAccount(id: ID!, accountInput: UpdateAccountInput): Account!
  }
`;
