import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitMQModule, RabbitMQService } from 'libs/common/rabbitmq';
import UsersService from './users.service';
import {USER_SERVICE} from 'libs/common/index'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USER_SERVICE,

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
