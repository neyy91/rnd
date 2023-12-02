import { IsString } from 'class-validator';

export class AddDictionaryCommand {
  @IsString()
  name: string;
}
