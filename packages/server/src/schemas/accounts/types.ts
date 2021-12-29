import { gql } from 'apollo-server-express';

export default gql`
  type Account {
    id: ID!
    name: String!
    email: String!
    photoPath: String
    language: AccountLanguageEnum!
    createdAt: Timestamp!
    updatedAt: Timestamp!
    reminders: [Reminder]
  }

  enum AccountLanguageEnum {
    en
    pt_br
  }
`;
