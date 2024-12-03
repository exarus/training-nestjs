import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './create-todo.dto';
import { AppRequest } from '../app/app-request.type';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  async create(@Body() body: CreateTodoDto, @Req() req: AppRequest) {
    return this.todosService.createTodo(req.user.id, body.title);
  }

  @Get()
  async list(@Req() req: AppRequest) {
    return this.todosService.listTodos(req.user.id);
  }
}
