import { IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class User {
  @IsInt()
  id: number;
}

export class AuthRequest {
  @ValidateNested()
  @Type(() => User)
  user: { id: number };
}
