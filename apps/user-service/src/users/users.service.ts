import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';
import { CreateUserDto } from 'libs/common';

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
      throw new ConflictException(
        'Email is already registered.',
      );
    }

    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(
        `User with id ${id} not found.`,
      );
    }

    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);
if (user === null){
  throw new NotFoundException('user not found')
}
     await this.usersRepository.delete(id)
   
  }
}