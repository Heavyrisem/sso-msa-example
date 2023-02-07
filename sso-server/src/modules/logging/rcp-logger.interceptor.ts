import { inspect } from 'util';

import { Observable } from 'rxjs';

import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';

@Injectable()
export class RpcLoggerInterceptor implements NestInterceptor {
  logger = new Logger('RpcRequestLogger');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const input = JSON.stringify(context.switchToRpc().getData());
    const controller = (context.switchToRpc() as any)?.constructorRef?.name || 'unknown';
    const method = (context.switchToHttp() as any)?.handler?.name || 'unknown';

    this.logger.log(`${controller}.${method}, ${input}`);
    return next.handle();
  }
}
