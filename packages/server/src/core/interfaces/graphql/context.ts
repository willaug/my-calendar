import express from 'express';
import { AuthAccount } from '../auth';

export interface Context {
  authAccount?: AuthAccount | null;
  models?: ContextModels;
  req?: express.Request;
}

export interface ContextModels {
  Accounts?: {
    createAccount?: any;
    updateAccount?: any;
    updatePassAccount?: any;
  };
  Login?: {
    authenticate?: any;
  };
}
