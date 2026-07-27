import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_PATTERNS, SERVICES, SignupDto } from 'libs/common';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AuthService {
  constructor(
    @Inject(SERVICES.AUTH_SERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  async signup(signupDto: SignupDto) {
    return firstValueFrom(
      this.authClient.send(
        AUTH_PATTERNS.SIGNUP,
        signupDto,
      ),
    );
  }
}