import {
  Injectable,
} from '@nestjs/common';
import { AuthSignupEvent, UserCreatedEvent,ForgetPasswordEvent } from 'libs/common';

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

  handleUserForgotPassword(payload: ForgetPasswordEvent){
    console.log(`Sending forgot password email to ${payload.email} with OTP: ${payload.otp}`,)
  }
}