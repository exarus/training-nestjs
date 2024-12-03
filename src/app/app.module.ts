import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TodosModule } from '../todos/todos.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../config/env.validation';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { AuthMiddleware } from '../auth/auth.middleware';

@Module({
  imports: [
    AuthModule,
    TodosModule,
    ConfigModule.forRoot({ isGlobal: true, validate }),
  ],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_GUARD, useExisting: AuthGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // in order to use DI in middleware, we need to use the .forRoutes('*')
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
