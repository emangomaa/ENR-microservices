import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { RabbitMQService } from 'libs/common/rabbitmq';
import { AUTH_QUEUE } from 'libs/common/constants/queues';

async function bootstrap(){
const app = await NestFactory.create(AppModule)

const rabbitMQService = app.get(RabbitMQService)

app.connectMicroservice(rabbitMQService.createMicroserviceOptions(AUTH_QUEUE))

await app.startAllMicroservices()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }))
}

bootstrap()