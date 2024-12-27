import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Environment } from 'src/common/config/environment/env.config';
import { envToken } from 'src/common/config/environment/env.const';
import { IAccessToken } from 'src/common/interface/auth/token.interface';
import { UserRepository } from 'src/user/user.repository';
import { Request } from 'express';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    environment: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.get<Environment>(envToken).accessTokenSecret,
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(request: Request, payload: IAccessToken) {
    console.log('payload', payload);
    const user = await this.userRepository.getUserById(payload.userId);
    const roles = await this.userRepository.getUserRoles(payload.userId);
    if (!user || user.isBanned === true) {
      throw new UnauthorizedException();
    }
    if (!user.roles) return { ...payload, roles: [] };
    return { ...payload, roles: roles };
  }
}
