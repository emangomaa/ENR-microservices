import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';


import { AuthController } from './auth.controller';
import { AUTH_QUEUE, RabbitMQModule, RabbitMQService, SERVICES } from 'libs/common';
import { RateLimitModule } from '../rateLimit/rate-limit.module';
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
    RateLimitModule,
  ],

  controllers: [
    AuthController,
  ],

  providers: [
  ],
})
export class AuthModule {}