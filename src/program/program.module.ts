import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from 'src/infrastructure';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { UsersModule } from 'src/users/users.module';
import { PairModule } from 'src/pair/pair.module';

@Module({})
@Module({
  imports: [TypeOrmModule.forFeature([Program]), UsersModule, PairModule],
  controllers: [ProgramController],
  providers: [ProgramService],
  exports: [TypeOrmModule, ProgramService],
})
export class ProgramModule {}
