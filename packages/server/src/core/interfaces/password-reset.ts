import { DeviceDetectorResult } from 'device-detector-js';
import { AccountSnakeCase } from './account';
import { Input } from './graphql/input';

export interface PasswordResetSnakeCase {
  id?: string;
  token?: string;
  used?: boolean;
  account_id?: string;
  created_at?: string;
  updated_at?: string;
  expires_at?: string;
  solicited_by?: PasswordResetRequester;
  updated_by?: PasswordResetRequester;
}

export interface PasswordResetMessage {
  message: 'success';
}

export interface PasswordResetData {
  passwordResetInput: Input['passwordResetInput'];
  account?: AccountSnakeCase;
  token?: string;
  agent: DeviceDetectorResult;
  accountLocation: PasswordResetAccountLocation;
}

export interface PasswordResetAccountLocation {
  query?: string;
  status?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  zip?: number;
  lat?: number;
  lon?: number;
  timezone?: string;
  isp?: string;
  org?: string;
  as?: string;
}

export interface PasswordResetRequester {
  requester: {
    ip: string;
    country: string;
    region: string;
    city: string;
  };
  device: {
    client: string | null;
    model: string | null;
    operatingSystem: {
      name: string | null;
      version: string | null;
    };
  };
}
