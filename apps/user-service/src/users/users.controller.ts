import {
  Controller,
} from '@nestjs/common';

import {
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import {
  AuthVerifiedEvent,
  AUTH_PATTERNS,
  USER_PATTERNS,
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
  @MessagePattern(USER_PATTERNS.FIND_ONE)
  async getUser(
    @Payload() id: number,
  ) {
    return this.usersService.findUser(id);
  }
  @MessagePattern(USER_PATTERNS.DELETE_ONE)
  async deleteUser(
    @Payload() id: number,
  ) {
    return this.usersService.deleteUser(id);
  }
}