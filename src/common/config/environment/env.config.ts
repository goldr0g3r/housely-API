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
