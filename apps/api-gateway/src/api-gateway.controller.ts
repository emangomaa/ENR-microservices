import { Controller, Get, Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Controller()
export class ApiGatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  @Get()
  hello() {
    return firstValueFrom(this.userServiceClient.send({ cmd: 'getHello' }, {}));
  }
}
