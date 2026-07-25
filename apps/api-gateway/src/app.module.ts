import { Module } from '@nestjs/common';
import { Transport, ClientsModule} from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { RabbitMQModule } from 'libs/common/rabbitmq';
import { UsersModule } from './users/users.module';
import rabbitmqConfig from './config/rabbitmq.config';
@Module({
  imports: [ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'apps/api-gateway/.env',
      load:[rabbitmqConfig]
    }),
    RabbitMQModule,
    UsersModule,
  ],
})
export class AppModule {}
