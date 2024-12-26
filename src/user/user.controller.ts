import { validate } from './../../node_modules/@types/uuid/index.d';
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { RegisterAccountDto } from './dto/request/RegisterAccount.dto';
import { LoginAcccountDto } from './dto/request/LoginAccount.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepo: UserRepository,
  ) {}

  @Post('register')
  async createUser(@Body() request: RegisterAccountDto) {
    return await this.userRepo.createUser(request);
  }

  @Post('login')
  async loginUser(@Body() request: LoginAcccountDto) {
    return await this.userRepo.validateUser(request);
  }
}
