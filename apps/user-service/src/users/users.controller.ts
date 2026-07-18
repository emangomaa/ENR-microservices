import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, USER_PATTERNS } from '../../../../libs/common/src/index';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 @MessagePattern(USER_PATTERNS.CREATE_USER)
  createUser(@Payload() createUserDto:CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


   @MessagePattern(USER_PATTERNS.FIND_ALL)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(USER_PATTERNS.FIND_ONE)
  findOne(
    @Payload() id: number,
  ) {
    return this.usersService.findById(id);
  }

  @MessagePattern(USER_PATTERNS.DELETE_ONE)
  delete(
    @Payload() id: number,
  ) {
    return this.usersService.delete(id);
  }
}

