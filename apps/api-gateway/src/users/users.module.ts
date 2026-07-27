import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitMQModule, RabbitMQService } from 'libs/common/rabbitmq';
import UsersService from './users.service';
import { SERVICES } from 'libs/common';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICES.USER_SERVICE,

        imports: [RabbitMQModule],

        inject: [RabbitMQService],

        useFactory: (rabbitMQService: RabbitMQService) =>
          rabbitMQService.createClientOptions('user.queue'),
      },
    ]),
  ],

  controllers: [UsersController],

  providers: [UsersService],
})
export class UsersModule {}
