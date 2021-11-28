export interface Input {
  accountInput?: {
    name?: string;
    email?: string;
    password?: string;
  };
  passAccountInput?: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  loginInput?: {
    email?: string;
    password?: string;
  }
}
