import { ConsoleLogger, Inject, Injectable, Scope } from '@nestjs/common';
import { LoggerOptions, Logger as WinstonLogger } from 'winston';
import { NESTJS_WINSTON_CONFIG_OPTIONS } from '../constants/logger.constant';
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private readonly logger: WinstonLogger;

  constructor(@Inject(NESTJS_WINSTON_CONFIG_OPTIONS) config: LoggerOptions) {
    super();
    this.logger = new WinstonLogger(config);
  }
}
