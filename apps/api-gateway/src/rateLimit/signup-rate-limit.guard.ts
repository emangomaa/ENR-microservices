import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SignupRateLimitService } from './signup-rate-limit.service';

@Injectable()
export class SignupRateLimitGuard implements CanActivate {
  constructor(private readonly rateLimitService: SignupRateLimitService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    await this.rateLimitService.assertAllowed(request.ip);
    // get form header device id 
    
    return true;
  }
}