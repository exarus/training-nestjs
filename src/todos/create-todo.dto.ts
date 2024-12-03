import { Length } from 'class-validator';

export class CreateTodoDto {
  @Length(3, 30)
  title: string;
}
