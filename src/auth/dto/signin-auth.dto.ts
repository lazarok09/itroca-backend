import { IsNotEmpty, IsString } from 'class-validator';

export class SignInAuthDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
