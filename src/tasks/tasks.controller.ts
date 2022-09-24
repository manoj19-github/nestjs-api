import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/tasks.dto';
import { IReturnBody, IReturnAllBody, Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): IReturnAllBody {
    const { title, description } = createTaskDto;
    return this.tasksService.createTask(title, description);
  }
  @Get(':id')
  getTaskById(@Param('id') id: string): IReturnBody {
    return this.tasksService.getTaskById(id);
  }
  @Delete(':id')
  deleteTaskById(@Param('id') id:string):IReturnAllBody{
    return this.tasksService.deleteTaskById(id);
  }
}
