import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export default class UsersService{
    constructor(private readonly configService: ConfigService) {
  console.log(this.configService.get('rabbitmq.host'));
  console.log(this.configService.get('rabbitmq.port'));
}
}