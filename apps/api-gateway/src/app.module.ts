import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from 'libs/common/rabbitmq';
import { UsersModule } from './usersService/users.module';
import rabbitmqConfig from './config/rabbitmq.config';
import { AuthModule } from './authService/auth.module';
import { JwtModule } from 'libs/common/jwt/jwt.module';
import { AuthorizationModule } from './auth/authorization.module';
@Module({
  imports: [ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'apps/api-gateway/.env',
      load:[rabbitmqConfig]
    }),
    RabbitMQModule,
    JwtModule,
    AuthorizationModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
