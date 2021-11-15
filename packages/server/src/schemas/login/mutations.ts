import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    login(loginInput: LoginInput): Login!
  }
`;
