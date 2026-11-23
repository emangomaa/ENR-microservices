import { Module } from '@nestjs/common';
import { SignupRateLimitService } from './signup-rate-limit.service';
import { SignupRateLimitGuard } from './signup-rate-limit.guard';

@Module({
  providers: [SignupRateLimitService, SignupRateLimitGuard],
  exports: [SignupRateLimitService, SignupRateLimitGuard],
})
export class RateLimitModule {}