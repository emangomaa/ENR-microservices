import { HttpStatus } from '@nestjs/common';

import {BaseRpcException} from "./base-rpc.exception"
export class PasswordsDoNotMatchException extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      'Passwords do not match.',
      'Bad Request'
    );
  }
}