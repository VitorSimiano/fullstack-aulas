import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

    @Get()
    findAll(){
        return this.tasksService.findAll();
    }

    @Post()
    create(@Body() newTask: TaskDto){
        return this.tasksService.create(newTask);
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.tasksService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateData: any) {
        return this.tasksService.update(id, updateData);
    }

    @Patch(':id')
    partialUpdate(@Param('id') id: string, @Body() updateData: any) {
        return this.tasksService.partialUpdate(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tasksService.remove(id);
    }
}
