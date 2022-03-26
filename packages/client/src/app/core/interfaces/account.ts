export interface Account {
  id?: string;
  name?: string;
  email?: string;
  photoPath?: string;
  language?: AccountLanguageEnum;
  createdAt?: string;
  updatedAt?: string;
}

export interface AccountInput {
  name?: string;
  email?: string;
  language?: AccountLanguageEnum,
}

export interface AccountPasswordInput {
  confirmNewPassword: string;
  currentPassword?: string;
  newPassword: string;
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
