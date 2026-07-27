import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { AuthService } from "./services/auth.service";
import { AuthRepository } from "./repositories/auth.repository";
import { AuthController } from "./controllers/auth.controller";
import { PasswordService } from "./services/password.service";
import { OtpService } from "./services/otp.service";
import { ClientsModule } from "@nestjs/microservices";
import { NOTIFICATION_QUEUE, RabbitMQModule, RabbitMQService, SERVICES } from "libs/common";
@Module({
  imports: [
    TypeOrmModule.forFeature([ User]),
    ClientsModule.registerAsync([
      {
        name:SERVICES.NOTIFICATION_SERVICE,
        imports:[RabbitMQModule],
        inject:[RabbitMQService],
        useFactory:(rabbitMQService:RabbitMQService)=>
          rabbitMQService.createClientOptions(NOTIFICATION_QUEUE)
      }
    ])

],
  controllers: [AuthController],
  providers: [AuthService,AuthRepository,PasswordService,OtpService],
  exports:[PasswordService,OtpService]
})
export class AuthModule {}