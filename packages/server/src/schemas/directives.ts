import { gql } from 'apollo-server-express';

export default gql`
  directive @isAuthenticated on FIELD_DEFINITION
  directive @camelToSnake on INPUT_FIELD_DEFINITION
`;
