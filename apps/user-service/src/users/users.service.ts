import {
  Injectable,
} from '@nestjs/common';

import {
  AuthVerifiedEvent,
} from 'libs/common';

import {
  UsersRepository,
} from './repositories/users.repository';
import { UserNotFoundException } from 'libs/common';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async createProfileFromAuth(
    event: AuthVerifiedEvent,
  ) {
    const existingProfile =
      await this.usersRepository.findByAuthUserId(
        event.userId,
      );

    if (existingProfile) {
      return existingProfile;
    }

    console.log(`Creating user profile for authUserId: ${event.userId}, email: ${event.email}`);
    return this.usersRepository.createProfile({
      authUserId: event.userId,
      email: event.email,
      firstName: null,
      lastName: null,
      phone: null,
      avatar: null,
    });
  }

  async findUser(
    id: number,
  ) {
    return this.usersRepository.findByAuthUserId(
      id,
    );
  }
  async deleteUser(
    id: number,
  ) {

    // check if the user exists before attempting to delete
    const existingProfile =
      await this.usersRepository.findById(
        id,
      );
    if (!existingProfile) {
      throw new UserNotFoundException();
    }

    return this.usersRepository.deleteUser(
      id,
    );
  }
}