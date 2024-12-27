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
import { UserRolesResponse } from './dto/response/userRoles.dto';
import { DefaultRoles } from 'src/common/interface/auth/enum/Roles';
import { use } from 'passport';

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
    return await this.toUserResponseModel(response);
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
      const res = await this.toUserResponseModel(user);
      return res;
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
      const res = this.toUserResponseModel(user);
      return res;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return null;
    }
  }

  async getUserSession(userId: UUID): Promise<UserSessionResponse> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return this.toUserSessionModel(undefined, false, 'User not found');
      }
      const session = user.session;
      if (!session) {
        return this.toUserSessionModel(undefined, false, 'Session not found');
      }
      return this.toUserSessionModel(user, true, 'Session found');
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return this.toUserSessionModel(undefined, false, 'An Error Occurred');
    }
  }

  async verifyRefreshToken(
    userId: UUID,
    refreshToken: TREFRESH_TOKEN,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) return false;

      const isRefreshTokenValid = user.session.find(
        (session) => session.refreshToken === refreshToken,
      );

      return !!isRefreshTokenValid;
    } catch (error) {
      this.logger.log(error);

      return false;
    }
  }

  async getUserByEmail(email: string): Promise<UserResponse | null> {
    try {
      const user = await this.userModel.findOne({ email: email });
      if (!user) {
        return null;
      }
      const res = await this.toUserResponseModel(user);
      return res;
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
    refreshToken: TREFRESH_TOKEN,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) return false;

      user.session = user.session.map((session) => {
        if (session.refreshToken === refreshToken) {
          session.refreshToken = undefined;
        }
        return session;
      });
      user.save();

      return true;
    } catch (error) {
      this.logger.log(error);

      return false;
    }
  }

  async getUserRoles(userId: UUID): Promise<UserRolesResponse | null> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return null;
      }
      return this.toUserRolesModel(user);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return null;
    }
  }

  async updateUserToAgent(userId: UUID): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return false;
      }
      user.isAgent = true;
      DefaultRoles.agent.forEach((role) => {
        user.roles.push(role);
      });
      await user.save();
      return true;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return false;
    }
  }

  private toUserResponseModel(user: UserSchema) {
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
  private toUserRolesModel(user: UserSchema) {
    return plainToClass(UserRolesResponse, user, {
      excludeExtraneousValues: true,
    });
  }
}
