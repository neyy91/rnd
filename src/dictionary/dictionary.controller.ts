import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DictionaryService } from './dictionary.service';
import { AddDictionaryCommand } from 'src/dto';

@Controller('dictionary')
export class DictionaryController {
  constructor(private service: DictionaryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:progId')
  async getDictionaries(@Param('progId', new ParseIntPipe()) progId: number) {
    return this.service.getDictionaries(progId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:progId')
  async addDictionary(
    @Body() command: AddDictionaryCommand,
    @Request() req,
    @Param('progId', new ParseIntPipe()) progId: number,
  ) {
    return this.service.addDictionary(progId, command, req.user);
  }
}
