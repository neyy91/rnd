import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from 'src/infrastructure';
import { ProgramModule } from 'src/program/program.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber]), ProgramModule],
  providers: [SubscriberService],
  controllers: [SubscriberController],
})
export class SubscriberModule {}
