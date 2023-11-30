import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PairService } from './pair.service';
import { CreatePairCommand } from 'src/dto/create-pair.command';

@Controller('pair')
export class PairController {
  constructor(private pairService: PairService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getPairs() {
    return this.pairService.getPairs();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addPair(@Body() command: CreatePairCommand) {
    return this.pairService.addPair(command);
  }
}
