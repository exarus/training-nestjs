import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const MAX_TODOS_PER_USER = 100;

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async createTodo(userId: number, title: string) {
    const count = await this.prisma.todo.count({ where: { userId } });
    if (count >= MAX_TODOS_PER_USER) {
      throw new BadRequestException(
        'You have reached the maximum number of todos',
      );
    }
    return this.prisma.todo.create({
      data: { title, userId },
    });
  }

  async listTodos(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
      take: MAX_TODOS_PER_USER,
    });
  }
}
