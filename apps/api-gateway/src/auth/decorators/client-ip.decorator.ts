import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClientIp = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    const ip: string = req.ip ?? req.socket?.remoteAddress ?? 'unknown';

    return ip.replace(/^::ffff:/, '');
  },
);