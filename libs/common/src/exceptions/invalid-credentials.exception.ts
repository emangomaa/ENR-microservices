import { HttpStatus } from '@nestjs/common';
import { BaseRpcException } from './base-rpc.exception';
export class InvalidCredentialsException extends BaseRpcException {
  constructor() {
    super(
          HttpStatus.UNAUTHORIZED,
          'Invalid email or password.',
          'Unauthorized'
        );
  }
}