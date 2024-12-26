import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { RequestLoggerInterceptor } from './common/helpers/interceptor/RequestLoggerInterceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/config/environment/env.config';
import { envToken } from './common/config/environment/env.const';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');

  const environment = app.get(ConfigService).get<Environment>(envToken);

  const logger = await app.resolve(LoggerService);
  app.useGlobalInterceptors(new RequestLoggerInterceptor(logger));

  const options = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(environment.port ?? 3000, '0.0.0.0');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
