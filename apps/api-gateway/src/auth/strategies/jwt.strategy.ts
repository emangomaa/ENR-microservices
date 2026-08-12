import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import {
  PassportStrategy,
} from '@nestjs/passport';

import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

import {
  ConfigService,
} from '@nestjs/config';

import {
  JwtPayload,
} from 'libs/common';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
{
  constructor(
    private readonly configService: ConfigService,
  ) {
    const secret =
      configService.get<string>(
        'JWT_SECRET',
      );

    if (!secret) {
      throw new Error(
        'JWT_SECRET is not configured.',
      );
    }

    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: secret,
    });
  }

  async validate(
    payload: JwtPayload,
  ) {
    if (!payload.sub) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}