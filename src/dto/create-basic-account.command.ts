import { IsEmail, IsString } from 'class-validator';

export class CreateBasicAccountCommand {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  role: number;
}
