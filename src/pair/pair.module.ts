import { Module } from '@nestjs/common';
import { PairController } from './pair.controller';
import { PairService } from './pair.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pair } from 'src/infrastructure';
import { LanguageModule } from 'src/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pair]), LanguageModule],
  controllers: [PairController],
  providers: [PairService],
  exports: [PairService],
})
export class PairModule {}
