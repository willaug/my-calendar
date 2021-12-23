import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    account: Account! @isAuthenticated
  }
`;
