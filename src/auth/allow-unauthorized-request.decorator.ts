import { SetMetadata } from '@nestjs/common';

export const ALLOW_UNAUTHORIZED_REQUEST_METADATA_KEY =
  'allowUnauthorizedRequest';
export const AllowUnauthorizedRequest = () =>
  SetMetadata(ALLOW_UNAUTHORIZED_REQUEST_METADATA_KEY, true);
