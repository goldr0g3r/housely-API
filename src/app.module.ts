import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { LoggerModule } from './common/logger/logger.module';
import GetWinstonConfig from './common/logger/WinstonConfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig, Environment } from './common/config/environment/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConnection } from './common/constants/mongo.constant';
import { envToken } from './common/config/environment/env.const';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    LoggerModule.forRoot(GetWinstonConfig()),
    MongooseModule.forRootAsync({
      connectionName: dbConnection.user,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<Environment>(envToken).mongoUri,
        dbName: configService.get<Environment>(envToken).userDb,
        retryWrites: true,
        retryAttempts: 5,
        writeConcern: {
          w: 'majority',
          wtimeout: 1000,
        },
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
