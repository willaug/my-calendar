interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
  photoPath: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export { Account };
