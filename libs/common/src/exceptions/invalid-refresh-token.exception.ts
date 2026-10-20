import { HttpStatus } from "@nestjs/common";
import { BaseRpcException } from "./base-rpc.exception";
export class InvalidRefreshTokenException extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.UNAUTHORIZED,
      'Invalid refresh token.',
      'Unauthorized'
    );
  }
}