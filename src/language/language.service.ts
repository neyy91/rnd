import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLangCommand } from 'src/dto/create-lang.command';
import { Language } from 'src/infrastructure';
import { Repository, In } from 'typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private repo: Repository<Language>,
  ) {}

  async getLanguages() {
    return this.repo.find();
  }

  async getLanguagesByIds(ids: number[]) {
    return this.repo.find({
      where: {
        id: In(ids),
      },
    });
  }

  async addLanguage(command: CreateLangCommand) {
    const exist = await this.repo.findOneBy(command);

    if (exist) {
      throw new BadRequestException('Язык уже добавлен');
    }

    const lang = this.repo.create(command);
    return this.repo.save(lang);
  }
}
