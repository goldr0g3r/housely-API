import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';
import { IUserResponse } from 'src/common/interface/user/response/IUserResponse';
import { TACCESS_TOKEN, TREFRESH_TOKEN } from 'src/common/types';

export class UserResponse implements IUserResponse {
  @ApiProperty({
    title: 'User ID',
    description: 'Unique identifier for the user',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @Expose()
  id: UUID;

  @ApiProperty({
    title: 'User Email',
    description: 'Email address of the user',
    example: 'johndoe@gmail.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    title: 'User First Name',
    description: 'First name of the user',
    example: 'John',
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    title: 'User Last Name',
    description: 'Last name of the user',
    example: 'Doe',
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    title: 'User Phone Number',
    description: 'Phone number of the user',
    example: '08012345678',
  })
  @Expose()
  phoneNumber?: string;

  @ApiProperty({
    title: 'User Address',
    description: 'Address of the user',
    example: '123, Main Street, Lagos',
  })
  @Expose()
  address?: string;

  @ApiProperty({
    title: 'User Roles',
    description: 'Roles assigned to the user',
    example: ['user'],
  })
  @Expose()
  roles: string[];

  @ApiProperty({
    title: 'User Active Status',
    description: 'Status of the user account',
    example: true,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    title: 'User Verification Status',
    description: 'Verification status of the user account',
    example: true,
  })
  @Expose()
  isVerified: boolean;

  @ApiProperty({
    title: 'User Banned Status',
    description: 'Banned status of the user account',
    example: false,
  })
  @Expose()
  isBanned: boolean;

  @ApiProperty({
    title: 'User Ban Reason',
    description: 'Reason for banning the user account',
    example: 'Spamming the platform',
  })
  @Expose()
  banReason?: string;

  @ApiProperty({
    title: 'User Agent Status',
    description: 'Agent status of the user account',
    example: false,
  })
  @Expose()
  isAgent: boolean;

  @ApiProperty({
    title: 'Created At',
    description: 'Date and time the user account was created',
    example: '2022-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    title: 'Updated At',
    description: 'Date and time the user account was last updated',
    example: '2022-01-01T00:00:00.000Z',
  })
  @Expose()
  updatedAt: Date;
}

export class UserResponseWithTokens extends UserResponse {
  @ApiProperty({
    title: 'Access Token',
    description: 'Access token for authentication.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJzdWIiOiJhZDY5ZWUxYS0xN2Y3LTRlMWEtYjBlNC0wOTYxYzFiOTU5ZjciLCJpc3MiOiJhdXRoIiwiYXVkIjoidXNlciIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzM0NjY4NjQzLCJleHAiOjE3MzUyNzM0NDN9.LHW1LDGWksGlvoX0MRlao1_n2L7QpqWX88SMcWV4Io0',
  })
  @Expose()
  accessToken: TACCESS_TOKEN;

  @ApiProperty({
    title: 'Refresh Token',
    description: 'Refresh Token for authentication',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDY5ZWUxYS0xN2Y3LTRlMWEtYjBlNC0wOTYxYzFiOTU5ZjciLCJpc3MiOiJhdXRoIiwiYXVkIjoidXNlciIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MzQ2NjUyMDksImV4cCI6MTczNDY2NjEwOX0.cy-Lcqr1CmGJeTwCxmPd5cNfQZuIACiAnbucW6HHFbg',
  })
  @Expose()
  refreshToken: TREFRESH_TOKEN;
}
