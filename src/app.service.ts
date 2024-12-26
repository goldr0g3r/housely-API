import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/config/environment/env.config';
import { envToken } from './common/config/environment/env.const';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getServerStatus(): string {
    const environment = this.configService.get<Environment>(envToken);
    return `Server is running on port: ${environment.port ?? 3000}`;
  }
}
