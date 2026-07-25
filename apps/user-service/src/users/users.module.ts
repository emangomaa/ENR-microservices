import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';
import { ClientsModule } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from 'libs/common';
import { RabbitMQModule } from 'libs/common/rabbitmq';
import { RabbitMQService } from 'libs/common/rabbitmq';
@Module({
 imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.registerAsync([ 
      { 
        name: NOTIFICATION_SERVICE, 
        imports: [RabbitMQModule],
         inject: [RabbitMQService], 
         useFactory: (rabbitMQService: RabbitMQService) =>
           rabbitMQService.createClientOptions('notification.queue'),
         }, 
        ])
  ],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository],
  exports:[UsersRepository]
})
export class UsersModule {}