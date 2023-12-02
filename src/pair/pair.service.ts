import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePairCommand } from 'src/dto/create-pair.command';
import { Pair } from 'src/infrastructure';
import { LanguageService } from 'src/language/language.service';
import { Repository, In } from 'typeorm';

@Injectable()
export class PairService {
  constructor(
    @InjectRepository(Pair)
    private pairRepository: Repository<Pair>,
    private langService: LanguageService,
  ) {}

  async getPairs() {
    return this.pairRepository.find();
  }

  async addPair(command: CreatePairCommand) {
    const exist = await this.pairRepository.findOneBy(command);

    if (exist) {
      throw new BadRequestException('Пара языков уже существует');
    }

    const pair = this.pairRepository.create(command);
    return this.pairRepository.save(pair);
  }

  async getPairsByIds(ids: number[]) {
    const pairs = await this.pairRepository.find({
      where: {
        id: In(ids),
      },
    });

    const langs = await this.langService.getLanguagesByIds([
      ...Array.from(new Set(pairs.map((x) => x.studyId))),
      ...Array.from(new Set(pairs.map((x) => x.nativeId))),
    ]);

    return pairs.map((x) => {
      return {
        pairId: x.id,
        pairName: `${langs.find((y) => y.id === x.nativeId).iso2} - ${
          langs.find((y) => y.id === x.studyId).iso2
        }`,
      };
    });
  }
}
