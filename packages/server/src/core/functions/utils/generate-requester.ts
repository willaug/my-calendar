import { PasswordResetRequester } from '@interfaces/password-reset';

export function generateRequesterLocation(data: PasswordResetRequester): string | null {
  const { requester } = data;
  const locationArray = [];

  Object.entries(requester).forEach(([key, value]: any[]) => {
    if (key === 'city' && value) locationArray[0] = value.trim();
    if (key === 'region' && value) locationArray[1] = value.trim();
    if (key === 'country' && value) locationArray[2] = value.trim();
  });

  const location = locationArray.filter((value: any) => value).join(', ');
  if (!location.length) return null;

  return location;
}

export function generateRequesterDevice(data: PasswordResetRequester): string | null {
  const { device } = data;
  const deviceArray = [];

  Object.entries(device).forEach(([key, value]: any[]) => {
    if (key === 'client' && value) deviceArray[0] = value.trim();
    if (key === 'model' && value) deviceArray[1] = value.trim();
    if (key === 'operatingSystem' && value.name) deviceArray[2] = `${value.name.trim()} ${value.version.trim()}`.trim();
  });

  const requesterDevice = deviceArray.filter((value: any) => value && value.length).join(', ');
  if (!requesterDevice.length) return null;

  return requesterDevice;
}
