import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    console.log(err, user, info);
    if (err || !user) {
      throw new UnauthorizedException(info.message);
    }
    return user;
  }
}