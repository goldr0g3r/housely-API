import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { envToken } from 'src/common/config/environment/env.const';
import { Environment } from 'src/common/config/environment/env.config';
import { TREFRESH_TOKEN } from 'src/common/types';
import { IRefreshToken } from 'src/common/interface/auth/token.interface';
import { UUID } from 'crypto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    environment: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.get<Environment>(envToken).refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IRefreshToken) {
    console.log('payload', payload);
    const refreshToken = req.headers.authorization.split(
      ' ',
    )[1] as TREFRESH_TOKEN;
    const refreshTokenValid =
      await this.authService.verifyRefreshTokenInDatabase(
        payload.userId as UUID,
        refreshToken,
      );
    console.log('refreshTokenValid', refreshTokenValid);
    if (!refreshTokenValid) throw new UnauthorizedException('Unauthorized');

    return { id: payload.userId, username: payload.sub, refreshToken };
  }
}
