import { Account } from './account';

export enum SignUpLanguageEnum {
  en,
  pt_br,
}

export interface SignUp {
  name: string;
  email: string;
  password: string;
  language?: SignUpLanguageEnum | string;
}

export interface SignUpResponse extends Account { }
