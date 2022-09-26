import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    console.log('process env : ', process.env.JWT_KEY);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }
  async validate(payload: any) {
    const user = await this.userService.findOneByID(payload.id);
    if (!user)
      throw new UnauthorizedException(
        'you are not authorized to perform the operation',
      );
    return payload;
  }
}
