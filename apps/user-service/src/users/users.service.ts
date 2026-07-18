import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';
import { CreateUserDto } from 'libs/common';
import { EmailAlreadyExistsException, UserNotFoundException } from 'libs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new EmailAlreadyExistsException(createUserDto.email);
    }

    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException(id);
    }

    return user;
  }

  async delete(id: number) {
    const user = await this.findById(id);
    if (!user){
      throw new UserNotFoundException(id)
    }
    await this.usersRepository.delete(id)
      return true
  }
}