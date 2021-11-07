import { gql } from 'apollo-server-express';

export default gql`
  type helloWorld {
    message: String!
  }
`;
