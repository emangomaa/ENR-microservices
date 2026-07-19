import { HttpStatus } from '@nestjs/common';

import { BaseRpcException } from './base-rpc.exception';

export class EmailAlreadyExistsException extends BaseRpcException {
  constructor(email: string) {
    super(
      HttpStatus.CONFLICT,
      `Email '${email}' is already registered.`,
      'Conflict',
    );
  }
}