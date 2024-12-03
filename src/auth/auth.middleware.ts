import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../config/environment-variables.model';
import type { PartialDeep } from 'type-fest';
import { AuthRequest } from './auth-request.model';
import { AuthToken } from './auth-token.type';

const AUTH_HEADER_PREFIX = 'Bearer ';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  use(
    req: Request & PartialDeep<AuthRequest>,
    res: Response,
    next: NextFunction,
  ) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next();
    if (!authHeader.startsWith(AUTH_HEADER_PREFIX)) {
      return next(
        new BadRequestException(
          'Invalid authorization header. Format is: Bearer <token>',
        ),
      );
    }
    const encodedToken = authHeader.substring(AUTH_HEADER_PREFIX.length);
    jwt.verify(
      encodedToken,
      this.configService.get('JWT_SECRET'),
      (err, decoded: AuthToken) => {
        if (err) {
          if (err instanceof jwt.TokenExpiredError) {
            return next(new BadRequestException('Token expired'));
          }
          if (err instanceof jwt.NotBeforeError) {
            return next(new BadRequestException('Token not yet active'));
          }
          return next(new BadRequestException('Invalid token'));
        }
        req.user = { id: decoded.userId };
        next();
      },
    );
  }
}
