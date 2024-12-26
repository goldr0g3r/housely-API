import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { RequestLoggerInterceptor } from './common/helpers/interceptor/RequestLoggerInterceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/config/environment/env.config';
import { envToken } from './common/config/environment/env.const';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const environment = app.get(ConfigService).get<Environment>(envToken);

  const logger = await app.resolve(LoggerService);
  app.useGlobalInterceptors(new RequestLoggerInterceptor(logger));

  const options = new DocumentBuilder()
    .setTitle('Housely API')
    .setDescription(
      'The backend API documentation for Real Estate app. The app can be used for creating and managing properties, users, and more.',
    )
    .setVersion('1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'accessToken',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refreshToken',
    )

    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(environment.port ?? 3000, '0.0.0.0');

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
