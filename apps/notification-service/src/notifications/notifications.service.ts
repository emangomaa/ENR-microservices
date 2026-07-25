import {
  Injectable,
} from '@nestjs/common';
import { UserCreatedEvent } from 'libs/common';

@Injectable()
export class NotificationsService {
  constructor() {}

  handleUserCreated(payload:UserCreatedEvent){
      console.log(`Sending welcome email to ${payload.email}`,)
  }
}