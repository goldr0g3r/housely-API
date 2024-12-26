import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { LoggerModule } from './common/logger/logger.module';
import GetWinstonConfig from './common/logger/WinstonConfig';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './common/config/environment/env.config';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    LoggerModule.forRoot(GetWinstonConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
