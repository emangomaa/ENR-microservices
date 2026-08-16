

import { HttpStatus } from "@nestjs/common";
import {BaseRpcException} from '../base-rpc.exception'

export class NewPasswordSameAsOldException extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      'New password must be different from the old password.',
      'Bad Request'
    );
  }
}
export class IncorrectCurrentPasswordException  extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      'The current password is incorrect.',
      'Bad Request'
    );
  }
}
export class PasswordsDoNotMatchException  extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      'The passwords do not match.',
      'Bad Request'
    );
  }
}