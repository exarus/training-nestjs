import { IsUrl, Length } from 'class-validator';

export class EnvironmentVariables {
  @IsUrl({
    protocols: ['mysql'],
    require_protocol: true,
    require_port: true,
    require_tld: false, // allows localhost
  })
  DATABASE_URL: string;
  @Length(1)
  JWT_SECRET: string;
}
