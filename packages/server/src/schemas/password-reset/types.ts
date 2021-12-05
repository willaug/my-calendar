import { gql } from 'apollo-server-express';

export default gql`
  type PasswordReset {
    message: String!
  }
`;
