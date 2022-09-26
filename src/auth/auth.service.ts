import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity ';
import { UserDto } from 'src/user/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!(await this.comparePassword(pass, user.password))) return null;
    return user;
  }
  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  private async generateToken(user: any) {
    return await this.jwtService.signAsync(user);
  }
  public async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = await this.generateToken({ id: user.id, email: user.email });
    delete user.password;
    return { user, token };
  }
  public async create(user: UserDto) {
    const userExists = await this.userService.findOneByEmail(user.email);
    if (!!userExists)
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.create({
      ...user,
      password: pass,
    });
    if (!newUser) throw new NotFoundException(`user exists`);

    return {
      error: false,
      message: 'user signup successfully',
    };
  }
}
