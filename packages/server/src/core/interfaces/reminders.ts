export interface Reminders {
  results: ReminderSnackCase[];
  totalCount: number;
  limit: number;
  offset: number;
}

export interface Reminder {
  id?: string;
  title: string;
  repeat: ReminderRepeat;
  fullDay: boolean;
  accountId: string;
  scheduledTo: Date;
  description: string | null;
  rememberEmail: boolean;
  reminderColor: string;
  remembered?: boolean;
  archived?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReminderSnackCase {
  id?: string;
  title: string;
  repeat: ReminderRepeatSnackCase;
  full_day: boolean;
  account_id?: string;
  description: string | null;
  scheduled_to: Date;
  remember_email: boolean;
  reminder_color: string;
  remembered?: boolean;
  archived?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ReminderAndAccountSnackCase extends ReminderSnackCase {
  account_name: string;
  account_email: string;
  account_language: string;
  scheduled_date?: string;
  scheduled_time?: string;
}

export interface RemindersQueryConditions {
  titleLike?: string;
  descriptionLike?: string;
  scheduledToStart?: Date;
  scheduledToEnd?: Date;
  reminderColorIn?: string[];
  rememberEmailEqual?: boolean;
  repeatIn?: ReminderRepeat[];
  fullDayEqual?: boolean;
  archivedEqual?: boolean;
}

export interface RemindersOrderBy {
  orderColumn: string;
  orderDirection: 'asc' | 'desc';
}

export enum ReminderRepeatSnackCase {
  'never',
  'every_day',
  'every_monday',
  'every_tuesday',
  'every_wednesday',
  'every_thursday',
  'every_friday',
  'every_saturday',
  'every_sunday',
}

export enum ReminderRepeat {
  'never',
  'everyDay',
  'everyMonday',
  'everyTuesday',
  'everyWednesday',
  'everyThursday',
  'everyFriday',
  'everySaturday',
  'everySunday',
}
