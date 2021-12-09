export interface AuthAccount {
  [key: string]: any;
  account_id: string;
  purpose: 'AUTHENTICATION';
  solicited_at: string;
}
