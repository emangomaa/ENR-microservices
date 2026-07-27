import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const entity = this.repository.create(user);

    return this.repository.save(entity);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async update(user: User): Promise<User> {
    return this.repository.save(user);
  }
}