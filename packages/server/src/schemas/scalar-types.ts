import { gql } from 'apollo-server-express';

export default gql`
  scalar HexadecimalColor
  scalar Timestamp
  scalar Upload
  scalar Email
  scalar Token
  scalar IP
`;
