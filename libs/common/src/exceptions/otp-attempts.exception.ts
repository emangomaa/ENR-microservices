
import { HttpStatus } from "@nestjs/common";
import {BaseRpcException} from './base-rpc.exception'

export class OtpAttemptsExceededException  extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      'Verification code is no longer valid. Request a new one.',
      'Bad Request'
    );
  }
}