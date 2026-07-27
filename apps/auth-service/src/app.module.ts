import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { RabbitMQModule } from "libs/common/rabbitmq";
import { AuthModule } from "./auth/auth.module";
import databaseConfig from "./config/database.config";
import rabbitmqConfig from "./config/rabbitmq.config";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'./apps/auth-service/.env',
    load:[databaseConfig,rabbitmqConfig]
  }),
  DatabaseModule,
  RabbitMQModule,
  AuthModule
],
})
export class AppModule {}