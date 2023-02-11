import { ValidationError } from 'class-validator';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';

import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class RpcLoggerInterceptor implements NestInterceptor {
  logger = new Logger('RpcRequestLogger');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToRpc();
    const input = JSON.stringify(ctx.getData());
    const controller = (ctx as any)?.constructorRef?.name ?? 'unknown';
    const method = (context.switchToHttp() as any)?.handler?.name ?? 'unknown';

    this.logger.log(`${controller}.${method} <== ${input}`);

    let isError = false;
    const response = [];
    return next.handle().pipe(
      map((v) => {
        response.push(v);
        return v;
      }),
      finalize(() => {
        !isError && this.logger.log(`${controller}.${method} ==> ${JSON.stringify(response)}`);
      }),
      catchError((err) => {
        isError = true;
        let message: string = err.message;
        if (err?.response?.message) {
          message = (err.response.message as string[])?.join(',') ?? message;
          err = new BadRequestException(message);
        }
        this.logger.debug(`${controller}.${method} ==> ${message}`);
        return throwError(() => err);
      }),
    );
  }
}
