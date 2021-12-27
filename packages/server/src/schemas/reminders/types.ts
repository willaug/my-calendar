import { gql } from 'apollo-server-express';

export default gql`
  type Reminder {
    id: ID!
    title: String!
    scheduledTo: Timestamp!
    description: String
    repeat: ReminderRepeatEnum!
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

  enum QueryRemindersOrderByDirectionEnum {
    desc
    asc
  }

  enum QueryRemindersOrderByColumnEnum {
    title
    description
    scheduledTo
    createdAt
    updatedAt
  }

  enum ReminderRepeatEnum {
    never
    everyDay
    everyMonday
    everyTuesday
    everyWednesday
    everyThursday
    everyFriday
    everySaturday
    everySunday
  }
`;
