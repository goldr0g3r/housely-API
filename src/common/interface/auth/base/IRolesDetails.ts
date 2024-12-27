import { Roles } from '../enum/Roles';

export interface IRoleDetails {
  name: string;
  description: string;
  role_id: Roles;
  active: boolean;
}

export interface IRoleCategoryDetails {
  name: string;
  description: string;
  roles: IRoleDetails[];
}
