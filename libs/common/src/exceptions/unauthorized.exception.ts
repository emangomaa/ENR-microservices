


import { HttpStatus } from "@nestjs/common";
import {BaseRpcException} from './base-rpc.exception'

export class UnauthorizedException extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.UNAUTHORIZED,
      'Invalid access token.',
      'Unauthorized'
    );
  }
}