// import { Observable, tap } from 'rxjs';

// import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';

// @Injectable()
// export class RpcLoggerInterceptor implements NestInterceptor {
//   logger = new Logger(RpcLoggerInterceptor.name);

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     // const input = context.switchToRpc().getData();
//     this.logger.log('test');
//     // https://github.com/nestjs/nest/issues/10275
//     // Nestjs 에서 gRpc 요청에 대해 자세한 정보를 아직 제공하지 않아서 로깅이 불가능함
//     return next.handle();
//   }
// }
