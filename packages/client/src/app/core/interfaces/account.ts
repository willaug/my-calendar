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
