import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceExceptionFilter } from './common/filters/microservice-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      }),
    );
  app.useGlobalFilters(
    new MicroserviceExceptionFilter()
  )
  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
