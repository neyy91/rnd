import { Module } from '@nestjs/common';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from 'src/infrastructure';
import { ProgramModule } from 'src/program/program.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary]), ProgramModule],
  controllers: [DictionaryController],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
