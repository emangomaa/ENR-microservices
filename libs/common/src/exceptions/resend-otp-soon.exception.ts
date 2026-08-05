import { HttpStatus } from '@nestjs/common';

import { BaseRpcException } from './base-rpc.exception';
export class ResendOtpTooSoonException extends BaseRpcException {
  constructor() {
    super(
      HttpStatus.TOO_MANY_REQUESTS,
        'Please wait before requesting another verification code.',
        'Too Many Requests'
    );
  }
}