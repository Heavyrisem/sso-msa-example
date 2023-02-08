import { status } from '@grpc/grpc-js';
import { Response, Request } from 'express';

import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  ExceptionFilter,
  Logger,
  HttpException,
} from '@nestjs/common';

@Catch(Error)
export class RpcExceptionFilter implements ExceptionFilter {
  logger = new Logger(RpcExceptionFilter.name);

  static RpcStatusCode: Record<number, number> = {
    // standard gRPC error mapping
    // https://cloud.google.com/apis/design/errors#handling_errors
    [status.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
    [status.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
    [status.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
    [status.NOT_FOUND]: HttpStatus.NOT_FOUND,
    [status.ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [status.ABORTED]: HttpStatus.GONE,
    [status.RESOURCE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS,
    [status.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
    [status.UNIMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
    [status.UNKNOWN]: HttpStatus.BAD_GATEWAY,
    [status.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
    [status.DEADLINE_EXCEEDED]: HttpStatus.GATEWAY_TIMEOUT,

    // additional built-in http exceptions
    // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
    [status.UNAVAILABLE]: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    [status.OUT_OF_RANGE]: HttpStatus.PAYLOAD_TOO_LARGE,
    [status.CANCELLED]: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    [status.CANCELLED]: HttpStatus.UNPROCESSABLE_ENTITY,
    [status.UNKNOWN]: HttpStatus.I_AM_A_TEAPOT,
    [status.CANCELLED]: HttpStatus.METHOD_NOT_ALLOWED,
    [status.FAILED_PRECONDITION]: HttpStatus.PRECONDITION_FAILED,
    [status.CANCELLED]: 499,
  };

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const method = request.method;
    const path = request.path;
    let status: HttpStatus;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else {
      status =
        RpcExceptionFilter.RpcStatusCode[(exception as any)?.code] ||
        HttpStatus.INTERNAL_SERVER_ERROR;
    }

    this.logger.verbose(`${method} ${path} ==> ${exception}\n${exception.stack}`);

    return response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
