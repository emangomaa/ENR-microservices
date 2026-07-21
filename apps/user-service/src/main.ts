import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RabbitMQService } from 'libs/common/rabbitmq';
async function bootstrap() {
// creates the application.
   const app = await NestFactory.create(AppModule);

  //  get instance of rabbitmq service
  const rabbitMQService = app.get(RabbitMQService);


// Nest internally creates:
// RabbitMQ connection
// RabbitMQ channel
// Queue consumer
  app.connectMicroservice(
    rabbitMQService.createMicroserviceOptions('user.queue'),
  );


// Nest begins listening for messages.
// Now your service is waiting.
  await app.startAllMicroservices();

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

}

bootstrap();