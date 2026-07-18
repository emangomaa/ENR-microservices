import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,  //tell nestjs to use TCP transport for microservices
        options: {
          host: '127.0.0.1', // this is the host address for the microservice
          port: 3001, //not http port it is tcp port for the microservice to listen on and communicate with other services
        },
      },
    );
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

  await app.listen();
}

bootstrap();