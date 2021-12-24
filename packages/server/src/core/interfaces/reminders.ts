export interface Reminder {
  id?: string;
  title: string;
  repeat: boolean;
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
  repeat: boolean;
  full_day: boolean;
  account_id: string;
  description: string | null;
  scheduled_to: Date;
  remember_email: boolean;
  reminder_color: string;
  remembered?: boolean;
  archived?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
