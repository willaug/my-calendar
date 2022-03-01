export interface Account {
  id?: string;
  name?: string;
  email?: string;
  photoPath?: string;
  language?: AccountLanguageEnum;
  createdAt?: string;
  updatedAt?: string;
}

export enum AccountLanguageEnum {
  en,
  pt_br,
}

export interface AccountDataList {
  title: string;
  icon: string;
  isDate?: boolean;
  data?: any;
}