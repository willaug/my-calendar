import { gql } from 'apollo-server-express';

export default gql`
  directive @authentication on FIELD_DEFINITION
`;
