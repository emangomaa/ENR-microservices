import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { Transport, ClientsModule} from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
