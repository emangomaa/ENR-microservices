import {
  ConflictException,
  Injectable,
  NotFoundException,
  Inject
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';
import { CreateUserDto, USER_PATTERNS } from 'libs/common';
import { EmailAlreadyExistsException, UserNotFoundException } from 'libs/common/exceptions';
import { NOTIFICATION_SERVICE } from 'libs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(NOTIFICATION_SERVICE) private readonly notificationClient: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new EmailAlreadyExistsException(createUserDto.email);
    }

    const user = await this.usersRepository.create(createUserDto);
    // publish event to notification service
    this.notificationClient.emit(
       USER_PATTERNS.USER_CREATED, 
       { 
          id: user.id,
          name: user.name,
          email: user.email,
       }, 
      );

      return user

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