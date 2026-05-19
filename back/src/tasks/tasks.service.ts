import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TasksService {
  private tasks = [
    {id: '1', title: 'Tarefa 1', description: 'Descricao Tarefa 1'},
    {id: '2', title: 'Tarefa 2', description: 'Descricao Tarefa 2'},
    {id: '3', title: 'Tarefa 3', description: 'Descricao Tarefa 3'},
    {id: '4', title: 'Tarefa 4', description: 'Descricao Tarefa 4'},
  ];

  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tasks.findMany(
      {
        include:{
          author: true,
          tags: true,
        }
      }
    );
  }

  async create(data: any) {
    return this.prisma.tasks.create({ data: data });
  }

  findOne(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  update(id: string, updateData: any) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { id, ...updateData }; // Substitui o objeto mantendo o ID
      return this.tasks[index];
    }
  }

  partialUpdate(id: string, updateData: any) {
    const task = this.findOne(id);
    if (task) {
      Object.assign(task, updateData);
      return task;
    }
    return null;
  }

  remove(id: string) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      return this.tasks.splice(index, 1)[0];
    }
  }
}
