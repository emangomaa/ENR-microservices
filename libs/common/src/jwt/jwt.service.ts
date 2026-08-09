import {
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UnauthenticatedException } from '../exceptions';


@Injectable()
export class JwtService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: NestJwtService,
  ) {}

  async sign(payload: JwtPayload) {
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') || '30m';

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: expiresIn as any,
    });
  }

  verify(token: string): JwtPayload {
    try {
      return this.jwtService.verify<JwtPayload>(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );
    } catch {
      throw new UnauthenticatedException();
    }
  }
}