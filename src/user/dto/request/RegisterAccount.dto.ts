import { ApiProperty } from '@nestjs/swagger';
import { IRegisterUserRequest } from 'src/common/interface/user/request';

export class RegisterAccountDto implements IRegisterUserRequest {
  @ApiProperty({
    title: 'User Email',
    description: 'Email address of the user',
    example: 'johndoe@gmail.com',
  })
  email: string;

  @ApiProperty({
    title: 'User Password',
    description: 'Password of the user',
    example: 'password123',
  })
  password: string;

  @ApiProperty({
    title: 'User First Name',
    description: 'First name of the user',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    title: 'User Last Name',
    description: 'Last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    title: 'User Phone Number',
    description: 'Phone number of the user',
    example: '08012345678',
  })
  phoneNumber?: string;

  @ApiProperty({
    title: 'User Address',
    description: 'Address of the user',
    example: '123, Main Street, Lagos',
  })
  address?: string;
}
