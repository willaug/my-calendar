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
  photoAccountInput?: any;
  loginInput?: {
    email?: string;
    password?: string;
  };
  passwordResetInput?: {
    email?: string;
    newPassword?: string;
    confirmNewPassword?: string;
    token?: string;
    ip?: string;
  }
}
