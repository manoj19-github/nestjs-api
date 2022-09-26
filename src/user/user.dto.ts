export class UserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly gender: string;
}

export class GetUserDto {
  email: string;
}
