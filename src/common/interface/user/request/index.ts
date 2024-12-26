import { UUID } from 'crypto';

export interface IRegisterUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
}

export interface ILoginUserRequest {
  email: string;
  password: string;
}

export interface ILogoutUserRequest {
  refreshToken: string;
  userId: UUID;
}
