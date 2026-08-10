import {
  Controller,
} from '@nestjs/common';

import {
  EventPattern,
  Payload,
} from '@nestjs/microservices';

import {
  AuthVerifiedEvent,
  AUTH_PATTERNS,
} from 'libs/common';

import {
  UsersService,
} from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @EventPattern(AUTH_PATTERNS.AUTH_VERIFIED)
  async handleAuthVerified(
    @Payload() event: AuthVerifiedEvent,
  ) {
    await this.usersService
      .createProfileFromAuth(event);
  }
}