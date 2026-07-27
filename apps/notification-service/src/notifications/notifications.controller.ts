import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { AUTH_PATTERNS, AuthSignupEvent, USER_PATTERNS, UserCreatedEvent } from 'libs/common';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}



  @EventPattern(USER_PATTERNS.USER_CREATED) 
  handleUserCreated( @Payload() payload: UserCreatedEvent, ) {
     return this.notificationsService.handleUserCreated(payload);
     }
  @EventPattern(AUTH_PATTERNS.SIGNUP) 
  handleUserSignup( @Payload() payload: AuthSignupEvent, ) {
     return this.notificationsService.handleUserSignup(payload);
     }
}

