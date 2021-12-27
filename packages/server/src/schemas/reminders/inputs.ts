import { gql } from 'apollo-server-express';

export default gql`
  input CreateReminderInput {
    title: String!
    repeat: ReminderRepeatEnum
    fullDay: Boolean
    description: String
    scheduledTo: Timestamp!
    rememberEmail: Boolean
    reminderColor: HexadecimalColor
  }

  input UpdateReminderInput {
    id: ID!
    title: String
    repeat: ReminderRepeatEnum
    fullDay: Boolean
    archived: Boolean
    description: String
    scheduledTo: Timestamp
    rememberEmail: Boolean
    reminderColor: HexadecimalColor
  }

  input QueryRemindersInput {
    where: QueryRemindersWhereInput
    orderBy: QueryRemindersOrderByInput
    limit: Int
    offset: Int
  }

  input QueryRemindersWhereInput {
    titleLike: String
    descriptionLike: String
    scheduledToStart: Timestamp
    scheduledToEnd: Timestamp
    reminderColorIn: [HexadecimalColor!]
    rememberEmailEqual: Boolean
    repeatIn: [ReminderRepeatEnum!]
    fullDayEqual: Boolean
    archivedEqual: Boolean
  }

  input QueryRemindersOrderByInput {
    orderColumn: QueryRemindersOrderByColumnEnum!
    orderDirection: QueryRemindersOrderByDirectionEnum!
  }
`;
