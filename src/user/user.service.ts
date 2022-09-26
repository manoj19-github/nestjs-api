import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_REPO } from './user.constants';
import { UserDto } from './user.dto';
import { User } from './user.entity ';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPO) private readonly userRepository: typeof User,
  ) {}
  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create(user);
  }
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne<User>({
      where: { email },
      raw: true,
    });
    return user;
  }
  async findOneByID(id: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { id },
      raw: true,
    });
  }
}
