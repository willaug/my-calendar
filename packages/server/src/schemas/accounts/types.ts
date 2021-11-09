import { gql } from 'apollo-server-express';

export default gql`
  type Account {
    id: ID!
    name: String!
    email: String!
    photoPath: String
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
`;