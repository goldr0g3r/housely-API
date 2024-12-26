import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAccountDto } from 'src/user/dto/request/RegisterAccount.dto';
import { Request } from 'express';
import { TIP_ADDRESS } from 'src/common/types';
import { UUID } from 'crypto';
import { LoginAcccountDto } from 'src/user/dto/request/LoginAccount.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() body: RegisterAccountDto, @Req() request: Request) {
    const res = await this.authService.registerAccount(
      body,
      request.ip as TIP_ADDRESS,
      request.headers['deviceId'] as UUID,
      request.headers['user-agent'],
    );
    return res;
  }

  @Post('sign-in')
  async signIn(@Body() body: LoginAcccountDto, @Req() request: Request) {
    const res = await this.authService.loginAccount(
      body,
      request.ip as TIP_ADDRESS,
      request.headers['deviceId'] as UUID,
      request.headers['user-agent'],
    );
    if (!res) throw new UnauthorizedException('invalid creds');
    return res;
  }

  @Get('logout')
  async signOut(@Req() request: Request, @Body() userId: UUID) {
    const res = await this.authService.logoutAccount(
      userId,
      request.headers['deviceId'] as UUID,
    );
    if (!res)
      throw new BadRequestException('Something went wrong while logging out!');
    return res;
  }
}
