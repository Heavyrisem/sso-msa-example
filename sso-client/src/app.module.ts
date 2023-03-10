import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/middleware/jwt.middleware';
import { ConfigurationModule } from './modules/config/config.module';
import { LoggerMiddleware } from './modules/logging/logger.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigurationModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
