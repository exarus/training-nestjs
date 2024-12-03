import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthGuard } from './auth.guard';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, AuthGuard, AuthMiddleware],
  controllers: [AuthController],
  exports: [AuthGuard, AuthMiddleware],
})
export class AuthModule {}
