import { gql } from 'apollo-server-express';

export default gql`
  type Reminder {
    id: ID!
    title: String!
    scheduledTo: Timestamp!
    description: String
    repeat: Boolean!
    fullDay: Boolean!
    rememberEmail: Boolean!
    reminderColor: HexadecimalColor!
    archived: Boolean!
    remembered: Boolean!
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
  
  type Reminders {
    results: [Reminder]
    totalCount: Int!
    limit: Int!
    offset: Int!
  }

  enum QueryRemindersOrderByDirection {
    desc
    asc
  }

  enum QueryRemindersOrderByColumn {
    title
    description
    scheduledTo
    createdAt
    updatedAt
  }
`;
