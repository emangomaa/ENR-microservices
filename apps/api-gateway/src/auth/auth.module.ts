import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';


import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AUTH_QUEUE, RabbitMQModule, RabbitMQService, SERVICES } from 'libs/common';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICES.AUTH_SERVICE,
        imports: [RabbitMQModule],
        inject: [RabbitMQService],
        useFactory: (
          rabbitMQService: RabbitMQService,
        ) =>
          rabbitMQService.createClientOptions(
            AUTH_QUEUE,
          ),
      },
    ]),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
  ],
})
export class AuthModule {}