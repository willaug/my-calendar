import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    reminders(queryRemindersInput: QueryRemindersInput): Reminders! @isAuthenticated
  }
`;
