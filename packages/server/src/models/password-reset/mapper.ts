import { hash } from 'bcrypt';
import {
  PasswordResetData,
  PasswordResetRequester,
  PasswordResetSnackCase,
} from '@interfaces/index';

function passwordResetRequesterMapper(data: PasswordResetData): PasswordResetRequester {
  return {
    requester: {
      ip: data.passwordResetInput.ip,
      country: data.accountLocation.countryCode,
      region: data.accountLocation.region,
      city: data.accountLocation.city,
    },
    device: {
      client: data.agent.client ? data.agent.client.name : null,
      model: data.agent.device ? data.agent.device.model : null,
      operatingSystem: {
        name: data.agent.os ? data.agent.os.name : null,
        version: data.agent.os ? data.agent.os.version : null,
      },
    },
  };
}

class PasswordResetMapper {
  public static toCreatePasswordReset(data: PasswordResetData): PasswordResetSnackCase {
    return {
      account_id: data.account.id,
      token: data.token,
      solicited_by: passwordResetRequesterMapper(data),
    };
  }

  public static toUpdatePasswordReset(data: PasswordResetData): PasswordResetSnackCase {
    return {
      used: true,
      updated_by: passwordResetRequesterMapper(data),
    };
  }

  public static async toUpdateAccountPassword(newPassword: string): Promise<{ password: string }> {
    const password = await hash(newPassword, Number(process.env.HASH_SALT) || 10);
    return { password };
  }
}

export default PasswordResetMapper;
