import { IsString } from 'class-validator';

export class CreatePairCommand {
  @IsString()
  nativeId: string;

  @IsString()
  studyId: string;
}
