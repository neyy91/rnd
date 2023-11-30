import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateLangCommand } from 'src/dto/create-lang.command';

@Controller('language')
export class LanguageController {
  constructor(private service: LanguageService) {}

//   @UseGuards(JwtAuthGuard)
  @Get()
  async getLanguages() {
    return this.service.getLanguages();
  }

//   @UseGuards(JwtAuthGuard)
  @Post()
  async addLanguage(@Body() command: CreateLangCommand) {
    return this.service.addLanguage(command);
  }
}
