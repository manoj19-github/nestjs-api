import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { filter } from 'rxjs';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/tasks.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-pipes-validation';
import { IReturnBody, IReturnAllBody, Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): IReturnAllBody {
    if (Object.keys(filterDto).length)
      return this.tasksService.getTaskWithFilter(filterDto);
    return this.tasksService.getAllTasks();
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): IReturnAllBody {
    const { title, description } = createTaskDto;
    return this.tasksService.createTask(title, description);
  }
  @Get(':id')
  getTaskById(@Param('id') id: string): IReturnBody {
    return this.tasksService.getTaskById(id);
  }
  @Delete(':id')
  deleteTaskById(@Param('id') id: string): IReturnAllBody {
    return this.tasksService.deleteTaskById(id);
  }
  @Put(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): IReturnAllBody {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
