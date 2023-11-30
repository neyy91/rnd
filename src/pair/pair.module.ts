import { Module } from '@nestjs/common';
import { PairController } from './pair.controller';
import { PairService } from './pair.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pair } from 'src/infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([Pair])],
  controllers: [PairController],
  providers: [PairService],
})
export class PairModule {}
