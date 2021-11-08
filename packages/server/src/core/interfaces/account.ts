interface Account {
  id?: string;
  name: string;
  email: string;
  password?: string;
  photoPath?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AccountSnackCase {
  id?: string;
  name: string;
  email: string;
  password?: string;
  photo_path?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export {
  Account,
  AccountSnackCase,
};
