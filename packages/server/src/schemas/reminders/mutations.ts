import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createReminder(createReminderInput: CreateReminderInput!): Reminder! @isAuthenticated
    updateReminder(updateReminderInput: UpdateReminderInput!): Reminder! @isAuthenticated
  }
`;
