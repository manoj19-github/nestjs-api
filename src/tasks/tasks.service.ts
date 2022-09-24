import { Injectable } from '@nestjs/common';
import { IReturnAllBody, IReturnBody, Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasksData: Task[] = [];
  getAllTasks() {
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
    return {
      error: false,
      message: 'your task is fetched successfully',
      task,
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
}
