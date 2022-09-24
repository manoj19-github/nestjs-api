import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
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
  createTask(title: string, description: string) {
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
}
