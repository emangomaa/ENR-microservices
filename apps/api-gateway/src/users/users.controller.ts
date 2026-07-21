import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto, USER_PATTERNS } from 'libs/common/index';
@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {}

   @Post('/')
  createUser(@Body() dto:CreateUserDto){
    return firstValueFrom(this.userClient.send(USER_PATTERNS.CREATE_USER,dto))
  }
   @Get('/')
  getAllUsers(){
    return firstValueFrom(this.userClient.send(USER_PATTERNS.FIND_ALL,{}))
  }

  @Get(':id')
  getUser(@Param('id',ParseIntPipe) id: number) {

    return firstValueFrom(this.userClient.send(USER_PATTERNS.FIND_ONE,id));
  }
  @Delete(':id')
  deleteUser(@Param('id',ParseIntPipe) id: number) {

    return firstValueFrom(this.userClient.send(USER_PATTERNS.DELETE_ONE,id));
  }

 
}
