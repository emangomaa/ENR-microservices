import { HttpStatus } from "@nestjs/common";
import { BaseRpcException } from "./base-rpc.exception";
export class UnVerifiedAccountException extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.FORBIDDEN,
      'Unverified account. Please verify your account before logging in.',
      'Forbidden'
    );
  }
}