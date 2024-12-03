import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ALLOW_UNAUTHORIZED_REQUEST_METADATA_KEY } from './allow-unauthorized-request.decorator';
import { Request } from 'express';
import { AuthRequest } from './auth-request.model';
import type { PartialDeep } from 'type-fest';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

/**
 * Can be merged into middleware for better performance
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<Request & PartialDeep<AuthRequest>>();
    const allowUnauthorizedRequest = this.reflector.get<boolean>(
      ALLOW_UNAUTHORIZED_REQUEST_METADATA_KEY,
      context.getHandler(),
    );
    return allowUnauthorizedRequest || this.validateRequest(request);
  }

  private validateRequest(request: Request & PartialDeep<AuthRequest>) {
    const validatedConfig = plainToInstance(AuthRequest, request, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });
    if (errors.length > 0) throw new UnauthorizedException();
    return true;
  }
}
