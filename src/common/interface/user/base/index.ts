import { UUID } from 'crypto';
import { TIP_ADDRESS, TREFRESH_TOKEN } from 'src/common/types';

export interface IUser {
  id: UUID;
  email: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  isAgent: boolean;
  phoneNumber?: string;
  address?: string;
  roles: string[];
  isActive: boolean;
  isVerified: boolean;
  isBanned: boolean;
  banReason?: string;
}

export interface IUserSessionDevice {
  deviceId: UUID;
  deviceType: string;
  deviceName: string;
  deviceIp: TIP_ADDRESS;
  clientType: string;
  clientName: string;
  clientVersion: string;
  platformType: string;
  os: string;
  osVersion: string;
  refreshToken?: TREFRESH_TOKEN;
}

export interface IUserSession {
  session: IUserSessionDevice[];
}
