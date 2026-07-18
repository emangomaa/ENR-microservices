import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto, USER_PATTERNS } from "../../../libs/common/src/index";
@Controller()
export class ApiGatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  @Get('users:id')
  getUser(@Param('id') id: string) {


    return firstValueFrom(this.userServiceClient.send(USER_PATTERNS.GET_USER,{ id: Number(id) }));
  }

  @Post('users')
  createUser(@Body() dto:CreateUserDto){
    return firstValueFrom(this.userServiceClient.send(USER_PATTERNS.CREATE_USER,dto))
  }
}
