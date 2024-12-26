import { validate } from './../../node_modules/@types/uuid/index.d';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectLogger } from 'src/common/logger/logger.decorator';
import { UserSchema } from './schema/user.schema';
import { dbConnection } from 'src/common/constants/mongo.constant';
import {
  ILoginUserRequest,
  IRegisterUserRequest,
} from 'src/common/interface/user/request';
import { Model } from 'mongoose';
import {
  comparePassword,
  hashPassword,
} from 'src/common/helpers/utils/password.util';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';
import { IUserSessionDevice } from 'src/common/interface/user/base';
import { TREFRESH_TOKEN } from 'src/common/types';
import UserSessionResponse from './dto/response/userSession.response';
import { UserResponse } from './entity/user.response';

@Injectable()
export class UserRepository {
  constructor(
    @InjectLogger(UserRepository.name) private readonly logger: Logger,
    @InjectModel(UserSchema.name, dbConnection.user)
    private readonly userModel: Model<UserSchema>,
  ) {
    console.log('UserRepository created');
  }
  async createUser(request: IRegisterUserRequest) {
    this.logger.log('Creating user');
    const hash = await hashPassword(request.password);
    const user = new this.userModel(request);
    user.password = hash.hash;
    user.salt = hash.salt;
    const response = await user.save();
    return response;
  }

  async validateUser(request: ILoginUserRequest): Promise<UserResponse | null> {
    try {
      const user = await this.userModel.findOne({
        email: request.email,
      });
      if (!user) {
        return null;
      }
      const isValid = await comparePassword(request.password, user.password);

      if (!isValid) {
        return null;
      }
      return this.toUseResponseModel(user);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return null;
    }
  }

  async getUserById(userId: UUID): Promise<UserResponse | null> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return null;
      }
      return this.toUseResponseModel(user);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<UserResponse | null> {
    try {
      const user = await this.userModel.findOne({ email: email });
      if (!user) {
        return null;
      }
      return this.toUseResponseModel(user);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return null;
    }
  }

  async updateSession(
    userId: UUID,
    session: IUserSessionDevice,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        this.logger.error('User not found');
        return false;
      }
      const found = user.session.findIndex(
        (s) => s.deviceId === session.deviceId,
      );

      if (found !== -1) {
        user.session[found].refreshToken = session.refreshToken;
        user.session[found].deviceIp = session.deviceIp;
      } else {
        user.session.push(session);
      }
      await user.save();
      return true;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return false;
    }
  }

  async updateRefreshToken(
    userId: UUID,
    oldRefreshToken: TREFRESH_TOKEN,
    refreshToken: TREFRESH_TOKEN,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        this.logger.error('User not found');
        return false;
      }
      const found = user.session.findIndex(
        (s) => s.refreshToken === oldRefreshToken,
      );
      if (found === -1) return false;
      user.session[found].refreshToken = refreshToken;
      await user.save();
      return true;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return false;
    }
  }

  async logoutDevice(
    userId: UUID,
    deviceId: UUID,
  ): Promise<UserSessionResponse> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user)
        return this.toUserSessionModel(
          undefined,
          false,
          "This user doesn't exist",
        );

      user.session = user.session.filter(
        (session) => session.deviceId !== deviceId,
      );
      await user.save();

      return this.toUserSessionModel(user, true, 'Device removed successfully');
    } catch (error) {
      this.logger.log(error);

      return this.toUserSessionModel(undefined, false, 'An Error Occurred');
    }
  }

  private toUseResponseModel(user: UserSchema) {
    return plainToClass(UserResponse, user, { excludeExtraneousValues: true });
  }

  private toUserSessionModel(
    user: UserSchema,
    status: boolean,
    message: string,
  ) {
    return plainToClass(
      UserSessionResponse,
      { session: user.session, status, message },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
