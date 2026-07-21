import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
import rabbitmqConfig from './config/rabbitmq.config';
import { RabbitMQModule } from 'libs/common/rabbitmq';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'apps/user-service/.env',
    load:[databaseConfig,rabbitmqConfig],
  }),
  DatabaseModule,
  RabbitMQModule,
  UsersModule
],
})
export class AppModule {}