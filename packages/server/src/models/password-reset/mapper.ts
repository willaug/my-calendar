import { PasswordResetData, PasswordResetSnackCase } from '@interfaces/index';

class PasswordResetMapper {
  public static toCreatePasswordReset(data: PasswordResetData): PasswordResetSnackCase {
    return {
      account_id: data.account.id,
      token: data.token,
      solicited_by: {
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
      },
    };
  }
}

export default PasswordResetMapper;
