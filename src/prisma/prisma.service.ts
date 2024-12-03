import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { EnvironmentVariables } from '../config/environment-variables.model';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private configService: ConfigService<EnvironmentVariables>) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
      log: ['info'],
    });
  }
}
