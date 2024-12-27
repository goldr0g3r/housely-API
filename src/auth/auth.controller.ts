import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAccountDto } from 'src/user/dto/request/RegisterAccount.dto';
import { Request } from 'express';
import { TIP_ADDRESS, TREFRESH_TOKEN } from 'src/common/types';
import { UUID } from 'crypto';
import { LoginAcccountDto } from 'src/user/dto/request/LoginAccount.dto';
import { AccessTokenGuard } from 'src/common/helpers/guards/accessToken.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard } from 'src/common/helpers/guards/refreshToken.guard';
import { Public } from 'src/common/helpers/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Sign up' })
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

  @Public()
  @ApiOperation({ summary: 'Sign in' })
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

  @ApiOperation({ summary: 'Sign out' })
  @Post('sign-out')
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth('refreshToken')
  async signOut(@Req() request: Request) {
    console.log(request.user);
    const res = await this.authService.logoutAccount(
      request.user['id'] as UUID,
      request.user['refreshToken'] as TREFRESH_TOKEN,
    );
    if (!res)
      throw new BadRequestException('Something went wrong while logging out!');
    return res;
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async getProfile(@Req() request: Request) {
    const res = await this.authService.profile(request.user['userId'] as UUID);
    console.log(res);
    if (!res) throw new UnauthorizedException('invalid creds!');
    return res;
  }

  @ApiBearerAuth('refreshToken')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshToken(@Req() request: Request) {
    const res = 'This works!';
    console.log(request.user);
    return res;
  }
}
