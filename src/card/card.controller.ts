import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddCardCommand, LearnCardCommand } from 'src/dto';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
  constructor(private service: CardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:dId')
  async getCards(
    @Request() req,
    @Param('dId', new ParseIntPipe()) progId: number,
  ) {
    return this.service.getCards(progId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:dId')
  async addCard(
    @Body() command: AddCardCommand,
    @Request() req,
    @Param('dId', new ParseIntPipe()) dId: number,
  ) {
    return this.service.addCard(dId, command, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:dId')
  async learnCard(
    @Body() command: LearnCardCommand,
    @Request() req,
    @Param('dId', new ParseIntPipe()) dId: number,
  ) {
    return this.service.learnCard(dId, command, req.user);
  }
}
