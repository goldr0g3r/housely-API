import {
  TACCESS_TOKEN,
  TIP_ADDRESS,
  TokenTypeEnum,
  TREFRESH_TOKEN,
} from './../common/types/index';
import { plainToClass, Type } from 'class-transformer';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import { isNull } from 'src/common/helpers/utils/validation.util';
import {
  IAccessToken,
  IRefreshToken,
  ITokens,
} from 'src/common/interface/auth/token.interface';
import {
  ILoginUserRequest,
  IRegisterUserRequest,
} from 'src/common/interface/user/request';
import { InjectLogger } from 'src/common/logger/logger.decorator';
import {
  UserResponse,
  UserResponseWithTokens,
} from 'src/user/entity/user.response';
import { UserRepository } from 'src/user/user.repository';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/common/config/environment/env.config';
import { envToken } from 'src/common/config/environment/env.const';
import * as DeviceDetector from 'device-detector-js';
import { comparePassword } from 'src/common/helpers/utils/password.util';
import { UserSchema } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectLogger(AuthService.name) private readonly logger: Logger,
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  private deviceDetector = new DeviceDetector();

  async registerAccount(
    request: IRegisterUserRequest,
    ip: TIP_ADDRESS,
    deviceId: UUID,
    userAgent: string,
  ) {
    try {
      const user = await this.userRepo.createUser(request);
      if (!user || isNull(user)) {
        this.logger.error('Something went wrong!');
        return null;
      }
      const tokens = await this.getTokens(user.id, user.email);
      if (isNull(tokens) || !tokens) return null;

      let deviceDetails: DeviceDetector.DeviceDetectorResult | undefined;
      if (userAgent) deviceDetails = this.deviceDetector.parse(userAgent);

      const status = await this.userRepo.updateSession(user.id, {
        deviceId: deviceId,
        deviceIp: ip,
        deviceName: deviceDetails
          ? `${deviceDetails.client.name} (${deviceDetails.os.name} ${deviceDetails.os.version} - ${deviceDetails.device.type})`
          : 'Unknown',
        deviceType: deviceDetails
          ? `${deviceDetails.device.type} ${deviceDetails.client.type}`
          : 'Unknown',
        clientType: deviceDetails ? deviceDetails.client.type : 'Unknown',
        clientName: deviceDetails ? deviceDetails.client.name : 'Unknown',
        clientVersion: deviceDetails ? deviceDetails.client.version : 'Unknown',
        platformType: deviceDetails ? deviceDetails.device.type : 'Unknown',
        os: deviceDetails ? deviceDetails.os.name : 'Unknown',
        osVersion: deviceDetails ? deviceDetails.os.version : 'Unknown',
        refreshToken: tokens.refreshToken,
      });

      if (!status) {
        this.logger.error('Something went Wrong!');
        return null;
      }
      return { user, tokens };
    } catch (error) {
      this.logger.error(error.toString());
      return null;
    }
  }

  async loginAccount(
    request: ILoginUserRequest,
    deviceIp: TIP_ADDRESS,
    deviceId: UUID,
    userAgent: string,
  ) {
    try {
      const user = await this.userRepo.getUserByEmail(request.email);
      if (!user || isNull(user)) {
        throw new UnauthorizedException('Invalid Email!');
      }
      const isValid = await this.userRepo.validateUser(request);
      if (!isValid) return null;

      const tokens = await this.getTokens(user.id, user.email);
      if (isNull(tokens) || !tokens) return null;

      let deviceDetails: DeviceDetector.DeviceDetectorResult | undefined;
      if (userAgent) deviceDetails = this.deviceDetector.parse(userAgent);

      const status = await this.userRepo.updateSession(user.id, {
        deviceId: deviceId,
        deviceIp: deviceIp,
        deviceName: deviceDetails
          ? `${deviceDetails.client.name} (${deviceDetails.os.name} ${deviceDetails.os.version} - ${deviceDetails.device.type})`
          : 'Unknown',
        deviceType: deviceDetails
          ? `${deviceDetails.device.type} ${deviceDetails.client.type}`
          : 'Unknown',
        clientType: deviceDetails ? deviceDetails.client.type : 'Unknown',
        clientName: deviceDetails ? deviceDetails.client.name : 'Unknown',
        clientVersion: deviceDetails ? deviceDetails.client.version : 'Unknown',
        platformType: deviceDetails ? deviceDetails.device.type : 'Unknown',
        os: deviceDetails ? deviceDetails.os.name : 'Unknown',
        osVersion: deviceDetails ? deviceDetails.os.version : 'Unknown',
        refreshToken: tokens.refreshToken,
      });

      if (!status) {
        this.logger.error('Something went Wrong while updating database!');
        return null;
      }

      return { user, tokens };
    } catch (error) {
      this.logger.error(error.toString());
      return null;
    }
  }

  async logoutAccount(userId: UUID, deviceId: UUID): Promise<boolean> {
    try {
      const status = await this.userRepo.logoutDevice(userId, deviceId);
      if (!status || isNull(status) || !status.status) return false;

      return true;
    } catch (error) {
      this.logger.error(error.toString());
      return false;
    }
  }

  async getTokens(userId: UUID, email: string): Promise<ITokens | null> {
    try {
      const user = await this.userRepo.getUserById(userId);
      if (isNull(user) || !user) return null;

      const accessTokenPayload: IAccessToken = {
        sub: email,
        userId: userId,
        type: TokenTypeEnum.ACCESS,
      };

      const refreshTokenPayload: IRefreshToken = {
        sub: email,
        userId: userId,
        type: TokenTypeEnum.REFRESH,
      };

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(accessTokenPayload, {
          expiresIn:
            this.configService.get<Environment>(envToken).accessTokenExpiresIn,
          secret:
            this.configService.get<Environment>(envToken).accessTokenSecret,
        }) as Promise<TACCESS_TOKEN>,
        this.jwtService.signAsync(refreshTokenPayload, {
          expiresIn:
            this.configService.get<Environment>(envToken).refreshTokenExpiresIn,
          secret:
            this.configService.get<Environment>(envToken).refreshTokenSecret,
        }) as Promise<TREFRESH_TOKEN>,
      ]);
      if (isNull(accessToken || refreshToken) || !accessToken || !refreshToken)
        return null;
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      this.logger.error(error.toString());
      return null;
    }
  }
}
