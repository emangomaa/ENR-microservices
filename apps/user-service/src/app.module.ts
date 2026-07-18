import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'apps/user-service/.env',
    load:[databaseConfig],
  }),
  DatabaseModule,
  UsersModule
],
})
export class AppModule {}