import { gql } from 'apollo-server-express';

export default gql`
  type Login {
    token: Token!
  }
`;
