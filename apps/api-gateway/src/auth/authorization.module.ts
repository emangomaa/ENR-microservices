import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from 'libs/common/jwt/jwt.module';

@Module({
  imports: [
    JwtModule,
  ],

  controllers: [
    
  ],

  providers: [
    JwtStrategy,
  ],
  exports: [
    JwtStrategy,
  ]
})
export class AuthorizationModule {}