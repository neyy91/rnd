import { IsNumber } from 'class-validator';

export class SubscribeCommand {
  @IsNumber()
  programId: number;
}
