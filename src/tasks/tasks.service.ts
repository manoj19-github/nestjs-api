import { Injectable, NotFoundException } from '@nestjs/common';
import { IReturnAllBody, IReturnBody, Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasksData: Task[] = [];
  getAllTasks(): IReturnAllBody {
    return {
      error: false,
      message: 'all TaskData fetched successfully',
      tasks: this.tasksData,
    };
  }
  createTask(title: string, description: string): IReturnAllBody {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasksData.push(task);
    return {
      error: false,
      message: 'your task is assigned',
      tasks: this.tasksData,
    };
  }
  getTaskById(id: string): IReturnBody {
    const task = this.tasksData.find((task) => task.id === id);
    if (!task) throw new NotFoundException(`task by the Id ${id} not found`);
    return {
      error: false,
      message: 'your task is fetched successfully',
      task,
    };
  }
  getTaskWithFilter(filterDto: GetTasksFilterDto): IReturnAllBody {
    const { status, search } = filterDto;
    let { tasks } = this.getAllTasks();
    tasks = tasks.filter(
      (task) =>
        (search && task.title.includes(search)) ||
        (search && task.status.includes(search)) ||
        (search && task.description.includes(search)) ||
        (search && task.id.includes(search)) ||
        (status && task.status === status),
    );
    return {
      error: false,
      message: 'your task is found',
      tasks,
    };
  }
  deleteTaskById(id: string): IReturnAllBody {
    const tasks = this.tasksData.filter((task) => task.id !== id);
    return {
      error: false,
      message: 'your task is deleted successfully',
      tasks,
    };
  }
  updateTaskStatus(id: string, status: TaskStatus): IReturnAllBody {
    const tasks = this.tasksData.map((task) => {
      if (task.id === id) return { ...task, status };
      return task;
    });
    this.tasksData = tasks;
    return {
      error: false,
      message: 'your task is updated successfully',
      tasks: this.tasksData,
    };
  }
}
