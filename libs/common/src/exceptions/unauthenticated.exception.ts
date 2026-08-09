


import { HttpStatus } from "@nestjs/common";
import {BaseRpcException} from './base-rpc.exception'

export class UnauthenticatedException extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.UNAUTHORIZED,
      'Unauthenticated.',
      'Unauthenticated'
    );
  }
}