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
    ClientsModule.registerAsync([
  {
    name: 'AUTH_SERVICE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('AUTH_SERVICE_HOST'),
        port: configService.get<number>('AUTH_SERVICE_PORT'),
      },
    }),
  },
  {
    name: 'USER_SERVICE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('USER_SERVICE_HOST'),
        port: configService.get<number>('USER_SERVICE_PORT'),
      },
    }),
  },
]),
  ],
})
export class AppModule {}
