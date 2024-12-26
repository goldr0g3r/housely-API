import { registerAs } from '@nestjs/config';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min, validateSync } from 'class-validator';
import { IEnvironment } from 'src/common/interface/environment';
import { envToken } from './env.const';

export class Environment implements IEnvironment {
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'PORT' })
  @Max(65535)
  @Min(1024)
  port: number;

  @IsNotEmpty()
  @Expose({ name: 'NODE_ENV' })
  nodeEnv: string;

  @IsNotEmpty()
  @Expose({ name: 'MONGO_URI' })
  mongoUri: string;

  @IsNotEmpty()
  @Expose({ name: 'USER_DATABASE_NAME' })
  userDb: string;

  @IsNotEmpty()
  @Expose({ name: 'CATEGORY_DATABASE_NAME' })
  categoryDb: string;

  @IsNotEmpty()
  @Expose({ name: 'PROPERTY_DATABASE_NAME' })
  propertyDb: string;

  @IsNotEmpty()
  @Expose({ name: 'ACCESS_TOKEN_SECRET' })
  accessTokenSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'REFRESH_TOKEN_SECRET' })
  refreshTokenSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'ACCESS_TOKEN_EXPIRES_IN' })
  accessTokenExpiresIn: string;

  @IsNotEmpty()
  @Expose({ name: 'REFRESH_TOKEN_EXPIRES_IN' })
  refreshTokenExpiresIn: string;

  @IsNotEmpty()
  @Expose({ name: 'COOKIE_SECRET' })
  cookieSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'COOKIE_EXPIRES_IN' })
  cookieExpiresIn: string;
}

export const envConfig = registerAs(envToken, (): Environment => {
  const envClass = plainToClass(Environment, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
    exposeUnsetFields: true,
  });

  const errors = validateSync(envClass, {
    skipMissingProperties: false,
  });
  const errorMessages = errors.map((error) => {
    return Object.values(error.constraints || {}).join(', ');
  });
  if (errors.length > 0) throw new Error(errorMessages.toString());

  return envClass;
});
