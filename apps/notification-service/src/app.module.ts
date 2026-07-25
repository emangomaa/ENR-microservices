import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
import rabbitmqConfig from './config/rabbitmq.config';
import { RabbitMQModule } from 'libs/common/rabbitmq';
import { NotificationsModule } from './notifications/notifications.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'apps/notification-service/.env',
    load:[databaseConfig,rabbitmqConfig],
  }),
  DatabaseModule,
  RabbitMQModule,
  NotificationsModule
],
})
export class AppModule {}