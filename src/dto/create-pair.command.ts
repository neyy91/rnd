import { IsString } from 'class-validator';

export class CreatePairCommand {
  @IsString()
  nativeId: number;

  @IsString()
  studyId: number;
}
