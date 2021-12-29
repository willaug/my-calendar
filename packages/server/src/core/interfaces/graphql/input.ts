import { RemindersOrderBy, RemindersQueryConditions } from '../reminders';
import { AccountLanguageSnackCase } from '../account';

export interface Input {
  accountInput?: {
    name?: string;
    email?: string;
    password?: string;
    language?: AccountLanguageSnackCase;
  };
  passAccountInput?: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  photoAccountInput?: any;
  loginInput?: {
    email?: string;
    password?: string;
  };
  passwordResetInput?: {
    email?: string;
    newPassword?: string;
    confirmNewPassword?: string;
    token?: string;
    ip?: string;
  },
  createReminderInput?: {
    title?: string;
    repeat?: boolean;
    fullDay?: boolean;
    description?: string;
    scheduledTo?: Date;
    rememberEmail?: boolean;
    reminderColor?: string;
  },
  updateReminderInput?: {
    id?: string;
    title?: string;
    repeat?: boolean;
    fullDay?: boolean;
    description?: string;
    scheduledTo?: Date;
    rememberEmail?: boolean;
    reminderColor?: string;
    archived?: boolean;
  },
  queryRemindersInput?: {
    where?: RemindersQueryConditions;
    orderBy?: RemindersOrderBy;
    limit?: number;
    offset?: number;
  },
  queryReminderInput?: string;
}
