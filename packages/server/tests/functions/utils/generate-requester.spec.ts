import { address, internet, random } from 'faker';
import {
  generateRequesterLocation,
  generateRequesterDevice,
} from '@core/functions/utils/generate-requester';
import { PasswordResetRequester } from '@interfaces/password-reset';

const data: PasswordResetRequester = {
  requester: {
    ip: internet.ip(),
    country: address.countryCode(),
    region: address.stateAbbr(),
    city: address.cityName(),
  },
  device: {
    client: random.word(),
    model: random.word(),
    operatingSystem: {
      name: random.word(),
      version: random.word(),
    },
  },
};

describe('GenerateRequester functions', () => {
  test('generateRequesterLocation function should return formatted location', () => {
    const location = generateRequesterLocation(data);
    const { city, country, region } = data.requester;

    expect(location).toEqual(`${city}, ${region}, ${country}`);
  });

  test('generateRequesterDevice function should return formatted device', () => {
    const device = generateRequesterDevice(data);
    const { client, model, operatingSystem } = data.device;

    expect(device).toEqual(`${client}, ${model}, ${operatingSystem.name} ${operatingSystem.version}`);
  });
});
