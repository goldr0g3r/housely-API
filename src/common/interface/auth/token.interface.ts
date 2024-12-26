import { UUID } from 'crypto';
import { TACCESS_TOKEN, TokenTypeEnum, TREFRESH_TOKEN } from 'src/common/types';

export interface ITokenBase {
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
  sub: string;
}

export interface IAccessPayload {
  userId: UUID;
  type: TokenTypeEnum.ACCESS;
}

export interface IAccessToken extends IAccessPayload, ITokenBase {}

export interface IRefreshPayload {
  userId: UUID;
  type: TokenTypeEnum.REFRESH;
}

export interface IRefreshToken extends IRefreshPayload, ITokenBase {}

export interface ITokens {
  accessToken: TACCESS_TOKEN;
  refreshToken: TREFRESH_TOKEN;
}
