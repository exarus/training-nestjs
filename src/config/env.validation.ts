import { EnvironmentVariables } from './environment-variables.model';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) throw new Error(errors.toString());
  return validatedConfig;
};
