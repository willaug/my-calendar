export interface AuthToken {
  account_id: string;
  purpose: 'AUTHENTICATION';
  solicited_at: string;
  iat: number;
  exp: number;
}
