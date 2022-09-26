import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetUserDto, UserDto } from './user.dto';
import { IUserReturnBody } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async create(@Body() createUser: UserDto) {
    const users = await this.userService.create(createUser);
    if (!!users)
      return {
        error: false,
        message: 'user created successfully',
        users: users,
      };
    return {
      error: true,
      message: 'user not created',
      users: [],
    };
  }
  @Get()
  async findOneByEmail(@Query() queryData: GetUserDto) {
    if (!Object.keys(queryData).length) throw new Error('email not be blank');
    const { email } = queryData;
    const user = await this.userService.findOneByEmail(email);
    if (user) return { error: false, user, message: 'user found' };
  }
}
