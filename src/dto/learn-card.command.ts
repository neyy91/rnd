import { IsNumber } from 'class-validator';

export class LearnCardCommand {
  @IsNumber()
  cardId: number;
}
