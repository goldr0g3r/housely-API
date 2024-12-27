import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IRoleCategoryDetails,
  IRoleDetails,
} from 'src/common/interface/auth/base/IRolesDetails';
import { DefaultRoles, Roles } from 'src/common/interface/auth/enum/Roles';
import IUserRoles from 'src/common/interface/user/base/IRoles';
import { APIResponse } from 'src/common/dto/APIResponse';
import IApiWithDataResponse from 'src/common/interface/api';
export class UserRolesResponse implements IUserRoles {
  @ApiProperty({
    title: 'User roles',
    description: 'The Roles of the user',
    type: [String],
    enum: Roles,
    example: DefaultRoles.buyer,
  })
  @Expose()
  roles: Roles[];
}

export class RoleDetailsResponse implements IRoleDetails {
  @ApiProperty({
    title: 'Name',
    description: 'Name of the role',
    example: 'Create Trip',
  })
  @Expose()
  name: string;

  @ApiProperty({
    title: 'Description',
    description: 'Description of the role',
    example: 'Create a property',
  })
  @Expose()
  description: string;

  @ApiProperty({
    title: 'Role ID',
    description: 'Role ID',
    example: Roles.CREATE_PROPERTY,
    enum: Roles,
  })
  @Expose()
  role_id: Roles;

  @ApiProperty({
    title: 'Active',
    description: 'Is the role active for user',
    example: true,
  })
  @Expose()
  active: boolean;
}

export class RoleCategoryDetailsResponse implements IRoleCategoryDetails {
  @ApiProperty({
    title: 'Name',
    description: 'Name of the role category',
    example: 'property',
  })
  @Expose()
  name: string;

  @ApiProperty({
    title: 'Description',
    description: 'Description of the role category',
    example: 'property related roles',
  })
  @Expose()
  description: string;

  @ApiProperty({
    title: 'Roles',
    description: 'Roles in the category',
    type: [RoleDetailsResponse],
  })
  @Type(() => RoleDetailsResponse)
  @Expose()
  roles: RoleDetailsResponse[];
}

export class UserRolesApiResponse
  extends APIResponse
  implements IUserRoles, IApiWithDataResponse<IRoleCategoryDetails[]>
{
  @ApiProperty({
    title: 'User roles',
    description: 'The Roles of the user',
    type: [String],
    enum: Roles,
    example: DefaultRoles.buyer,
  })
  @Expose()
  roles: Roles[];

  @ApiProperty({
    title: 'Available Roles',
    description: 'Available roles for the user',
    type: [RoleCategoryDetailsResponse],
  })
  @Type(() => RoleCategoryDetailsResponse)
  @Expose()
  data: RoleCategoryDetailsResponse[];
}
