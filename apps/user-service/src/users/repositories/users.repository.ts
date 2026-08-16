import {
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import {
  UserProfile,
} from '../entities/user-profile.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserProfile)
    private readonly repository: Repository<UserProfile>,
  ) {}

  async findByAuthUserId(
    authUserId: number,
  ): Promise<UserProfile | null> {
    return this.repository.findOne({
      where: {
        authUserId,
      },
    });
  }

  async createProfile(
    data: Partial<UserProfile>,
  ): Promise<UserProfile> {
    const profile =
      this.repository.create(data);

    return this.repository.save(profile);
  }

  async findById(
    id: number,
  ): Promise<UserProfile | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }
  async deleteUser(
    id: number,
  ): Promise<void> {
    await this.repository.delete({
      id: id,
    });
  }
}