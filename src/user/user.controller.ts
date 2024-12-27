import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { Request } from 'express';
import { UUID } from 'crypto';
import { AccessTokenGuard } from 'src/common/helpers/guards/accessToken.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepo: UserRepository,
  ) {}

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Become an agent' })
  @Post('agent')
  async becomeAgent(@Req() request: Request) {
    const res = await this.userRepo.updateUserToAgent(
      request.user['userId'] as UUID,
    );
    return res;
  }
}
