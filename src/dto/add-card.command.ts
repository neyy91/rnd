import { IsString } from 'class-validator';

export class AddCardCommand {
  @IsString()
  native: string;

  @IsString()
  study: string;

  @IsString()
  description: string;
}
