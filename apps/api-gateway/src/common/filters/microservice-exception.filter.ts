import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class MicroserviceExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error = exception.getError();

    if (typeof error === 'string') {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        error: 'Internal Server Error',
      });

      return;
    }

    const {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
      message = 'Internal Server Error',
      error: errorName = 'Internal Server Error',
    } = error as {
      statusCode?: number;
      message?: string;
      error?: string;
    };

    response.status(statusCode).json({
      statusCode,
      message,
      error: errorName,
    });
  }
}