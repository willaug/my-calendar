import { gql } from 'apollo-server-express';

export default gql`
  input CreateReminderInput {
    title: String!
    repeat: Boolean
    fullDay: Boolean
    description: String
    scheduledTo: Timestamp!
    rememberEmail: Boolean
    reminderColor: HexadecimalColor
  }
`;
