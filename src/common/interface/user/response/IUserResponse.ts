import { UUID } from 'crypto';

export interface IUserResponse {
  id: UUID;
  email: string;
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
