import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetUserDto } from 'src/user/user.dto';
import { User } from 'src/user/user.entity ';

import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/tasks.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-pipes-validation';
import { IReturnBody, IReturnAllBody, Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
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
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): IReturnAllBody {
    const { title, description } = createTaskDto;
    console.log('user data : ', user);
    return this.tasksService.createTask(title, description, user);
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


