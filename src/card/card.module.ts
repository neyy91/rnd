import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryModule } from 'src/dictionary/dictionary.module';
import { Card, Progress } from 'src/infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Progress]), DictionaryModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
