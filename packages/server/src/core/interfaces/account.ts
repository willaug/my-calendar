export interface Account {
  id?: string;
  name: string;
  email: string;
  password?: string;
  language: string;
  photoPath?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AccountSnakeCase {
  id?: string;
  name: string;
  email: string;
  password?: string;
  language: string;
  photo_path?: string | null;
  created_at?: Date;
  updated_at?: Date;
}
