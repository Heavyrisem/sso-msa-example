import { catchError, finalize, Observable, throwError } from 'rxjs';

import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';

@Injectable()
export class RpcLoggerInterceptor implements NestInterceptor {
  logger = new Logger('RpcRequestLogger');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToRpc();
    const input = JSON.stringify(context.switchToRpc().getData());
    const controller = (context.switchToRpc() as any)?.constructorRef?.name || 'unknown';
    const method = (context.switchToHttp() as any)?.handler?.name || 'unknown';

    this.logger.log(`${controller}.${method} <== ${input}`);

    let isError = false;
    return next.handle().pipe(
      finalize(() => {
        const response = JSON.stringify(ctx.getData());
        !isError && this.logger.log(`${controller}.${method} ==> ${response}`);
      }),
      catchError((err) => {
        isError = true;
        this.logger.debug(`${controller}.${method} ==> ${err.message}`);
        return throwError(() => err);
      }),
    );
  }
}
