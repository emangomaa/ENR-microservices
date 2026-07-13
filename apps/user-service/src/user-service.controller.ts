import { Controller, Get } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

 @MessagePattern({ cmd: 'getHello' })
  getHello(): string {
    return "hellow from user service";
  }
}
