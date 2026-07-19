import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class BaseRpcException extends RpcException {
  constructor(
    statusCode: HttpStatus,
    message: string,
    error: string,
  ) {
    super({
      statusCode,
      message,
      error,
    });
  }
}