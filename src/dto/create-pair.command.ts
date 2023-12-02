import { IsNumber } from 'class-validator';

export class CreatePairCommand {
  @IsNumber()
  nativeId: number;

  @IsNumber()
  studyId: number;
}
