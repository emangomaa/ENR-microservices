import { HttpStatus } from "@nestjs/common";
import { BaseRpcException } from "./base-rpc.exception";
export class InvalidOtpException extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      'Verification code has expired.',
      'Bad Request'
    );
  }
}