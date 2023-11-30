import { IsNumber, IsString } from 'class-validator';

export class CreateProgramCommand {
  @IsNumber()
  pairId: number;

  @IsString()
  name: string;
}
