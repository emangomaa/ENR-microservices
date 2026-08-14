import {
  Module,
} from '@nestjs/common';

import {
  PassportModule,
} from '@nestjs/passport';

import {
  JwtStrategy,
} from './strategies/jwt.strategy';

import {
  JwtAuthGuard,
} from './guards/jwt-auth.guard';

import {
  RolesGuard,
} from './guards/roles.guard';

@Module({
  imports: [
    PassportModule,
  ],

  providers: [
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],

  exports: [
    JwtAuthGuard,
    RolesGuard,
  ],
})
export class AuthorizationModule {}