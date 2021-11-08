import { Account, AccountSnackCase } from '@interfaces/index';
import { hash } from 'bcrypt';

class AccountsMapper {
  public static async toCreateAccount(account: Account): Promise<AccountSnackCase> {
    return {
      name: account.name,
      email: account.email,
      password: await hash(account.password, Number(process.env.HASH_SALT) || 10),
    };
  }
}

export default AccountsMapper;
