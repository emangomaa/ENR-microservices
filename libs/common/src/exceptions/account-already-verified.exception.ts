
import { HttpStatus } from "@nestjs/common";
import {BaseRpcException} from './base-rpc.exception'

export class AccountAlreadyVerified extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.CONFLICT,
      'Account lready Verified!.',
      'Conflict'
    );
  }
}