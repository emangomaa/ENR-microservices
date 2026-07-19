import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto, USER_PATTERNS } from "../../../libs/common/src/index";
@Controller('users')
export class ApiGatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

   @Post('/')
  createUser(@Body() dto:CreateUserDto){
    return firstValueFrom(this.userServiceClient.send(USER_PATTERNS.CREATE_USER,dto))
  }
   @Get('/')
  getAllUsers(){
    return firstValueFrom(this.userServiceClient.send(USER_PATTERNS.FIND_ALL,{}))
  }

  @Get(':id')
  getUser(@Param('id',ParseIntPipe) id: number) {

    return firstValueFrom(this.userServiceClient.send(USER_PATTERNS.FIND_ONE,id));
  }
  @Delete(':id')
  deleteUser(@Param('id',ParseIntPipe) id: number) {

    return firstValueFrom(this.userServiceClient.send(USER_PATTERNS.DELETE_ONE,id));
  }

 
}
