import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UserServiceModule } from './user-service.module';
async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      UserServiceModule,
      {
        transport: Transport.TCP,  //tell nestjs to use TCP transport for microservices
        options: {
          host: '127.0.0.1', // this is the host address for the microservice
          port: 3001, //not http port it is tcp port for the microservice to listen on and communicate with other services
        },
      },
    );

  await app.listen();
}

bootstrap();