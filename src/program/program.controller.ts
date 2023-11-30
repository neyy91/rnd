import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateProgramCommand } from 'src/dto';
import { ProgramService } from './program.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('program')
export class ProgramController {
  constructor(private service: ProgramService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPrograms() {
    return this.service.getPrograms();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/self')
  async getProgramsByUser(@Request() req) {
    return this.service.getPrograms(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addProgram(@Request() req, @Body() command: CreateProgramCommand) {
    return this.service.addProgram(command, req.user);
  }
}
