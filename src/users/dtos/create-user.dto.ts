import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: '有効なメールアドレスではありません．',
    },
  )
  email: string;

  @IsString()
  password: string;
}
