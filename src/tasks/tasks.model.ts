import { User } from 'src/user/user.entity ';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  user?: User;
}

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface IReturnBody {
  error: boolean;
  message: string;
  task: Task;
}
export interface IReturnAllBody {
  error: boolean;
  message: string;
  tasks: Task[];
}
