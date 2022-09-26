import { UserDto } from './user.dto';

export interface IUser {
  name: string;
  password: string;
  gender: 'male' | 'female';
  email: string;
}

export interface IUserReturnBody {
  error: boolean;
  users: IUser[];
  message: string;
}
