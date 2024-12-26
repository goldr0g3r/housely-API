import { ApiProperty } from '@nestjs/swagger';
import { ILoginUserRequest } from 'src/common/interface/user/request';

export class LoginAcccountDto implements ILoginUserRequest {
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
}
