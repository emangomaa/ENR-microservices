import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { UsersRepository } from './repositories/users.repository';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitMQModule } from 'libs/common/rabbitmq';
import { RabbitMQService } from 'libs/common/rabbitmq';
import { SERVICES } from 'libs/common';
@Module({
 imports: [
    TypeOrmModule.forFeature([UserProfile]),
    ClientsModule.registerAsync([ 
      { 
        name: SERVICES.NOTIFICATION_SERVICE, 
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