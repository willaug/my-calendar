import express from 'express';
import { AuthAccount } from '../auth';

export interface Context {
  authAccount?: AuthAccount | null;
  models?: ContextModels;
  req?: express.Request;
}

export interface ContextModels {
  Accounts?: {
    account?: any;
    createAccount?: any;
    updateAccount?: any;
    updatePassAccount?: any;
    uploadPhotoAccount?: any;
    deletePhotoAccount?: any;
  };
  Login?: {
    authenticate?: any;
  };
  PasswordReset?: {
    createPasswordReset?: any;
    updatePasswordReset?: any;
  },
  Reminders?: {
    reminders?: any;
    createReminder?: any;
    updateReminder?: any;
  }
}
