import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './modules/config/config.module';
import { HttpLoggerMiddleware } from './modules/logging/http-logger.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigurationModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
