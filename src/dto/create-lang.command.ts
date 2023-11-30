import { IsString } from 'class-validator';

export class CreateLangCommand {
  @IsString()
  name: string;

  @IsString()
  iso2: string;
}
