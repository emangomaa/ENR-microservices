import { HttpStatus } from '@nestjs/common';
import { BaseRpcException } from './base-rpc.exception';


export class UserNotFoundException extends BaseRpcException {
  constructor(id: number) {
    super(
      HttpStatus.NOT_FOUND,
      `User with id ${id} not found.`,
      'Not Found',
    );
  }
}