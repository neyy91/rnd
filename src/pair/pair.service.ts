import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePairCommand } from 'src/dto/create-pair.command';
import { Pair } from 'src/infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class PairService {
  constructor(
    @InjectRepository(Pair)
    private pairRepository: Repository<Pair>,
  ) {}

  async getPairs() {
    return this.pairRepository.find();
  }

  async addPair(command: CreatePairCommand) {
    const exist = await this.pairRepository.findOneBy(command);

    if (exist) {
      throw new Error('Пара языков уже существует');
    }

    const pair = this.pairRepository.create(command);
    return this.pairRepository.save(pair);
  }
}
