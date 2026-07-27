import {
  Injectable,
} from '@nestjs/common';
import { AuthSignupEvent, UserCreatedEvent } from 'libs/common';

@Injectable()
export class NotificationsService {
  constructor() {}

  handleUserCreated(payload:UserCreatedEvent){
      console.log(`Sending welcome email to ${payload.email}`,)
  }
  handleUserSignup(payload:AuthSignupEvent){
    console.log(payload)
      console.log(`Sending welcome email to ${payload.email}`,)
  }
}