import { Request, Response } from 'express';
import { catchError, finalize, Observable, throwError } from 'rxjs';

import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  logger = new Logger(HttpLoggerInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const path = request.path;
    const method = request.method;

    this.logger.log(`${method} ${path} <==`);

    let isError = false;
    const nextObserver = next.handle().pipe(
      finalize(() => {
        const response = ctx.getResponse<Response>();
        !isError && this.logger.log(`${method} ${path} ==> ${response?.statusCode}`);
      }),
      catchError((err) => {
        isError = true;
        this.logger.error(
          `${method} ${path} ==> ${err?.statusCode || err?.status || err?.code} ${err.message}`,
        );
        this.logger.verbose(err?.stack);
        return throwError(() => err);
      }),
    );

    return nextObserver;
  }
}
