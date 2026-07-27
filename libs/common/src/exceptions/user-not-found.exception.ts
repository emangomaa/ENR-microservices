import { HttpStatus } from '@nestjs/common';
import { BaseRpcException } from './base-rpc.exception';


export class UserNotFoundException extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.NOT_FOUND,
      `User not found.`,
      'Not Found',
    );
  }
}