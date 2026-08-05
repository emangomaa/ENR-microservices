import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { RabbitMQModule } from "libs/common/rabbitmq";
import { AuthModule } from "./auth/auth.module";
import databaseConfig from "./config/database.config";
import rabbitmqConfig from "./config/rabbitmq.config";
import redisConfig from "./config/redis.config";
import { RedisModule } from "libs/common/redis/redis.module";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'./apps/auth-service/.env',
    load:[databaseConfig,rabbitmqConfig,redisConfig]
  }),
  DatabaseModule,
  RabbitMQModule,
  RedisModule,
  AuthModule
],
})
export class AppModule {}