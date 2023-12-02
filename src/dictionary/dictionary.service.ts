import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddDictionaryCommand } from 'src/dto';
import { Dictionary } from 'src/infrastructure';
import { ProgramService } from 'src/program/program.service';
import { RoleTypeKey } from 'src/roles/role-type-key.enum';
import { Repository } from 'typeorm';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private repo: Repository<Dictionary>,
    private programService: ProgramService,
  ) {}

  async getDictionaries(programId: number) {
    return this.repo.find({
      where: {
        programId,
      },
    });
  }

  async addDictionary(programId: number, command: AddDictionaryCommand, user) {
    if (user.roleName !== RoleTypeKey.teacher) {
      throw new BadRequestException('Словарь добавляет только учитель');
    }

    if (command.name && command.name.trim().length < 3) {
      throw new BadRequestException(
        `Название словаря должно быть более 3 символов`,
      );
    }

    const programExist = await this.programService.getProgramById(programId);

    if (!programExist) {
      throw new BadRequestException(
        `Программы с id '${programId}' еще не существует`,
      );
    }

    if (programExist.ownerId !== user.userId) {
      throw new BadRequestException(
        `В программу может добавить новый словарь только ее владелец`,
      );
    }

    const prepareData = {
      name: command.name.trim(),
      programId: programId,
    };

    const existDictionary = await this.repo.findOneBy(prepareData);

    if (existDictionary) {
      throw new BadRequestException(
        `Словарь с названем '${command.name.trim()}' уже существует в даной программе`,
      );
    }

    const dictionary = this.repo.create(prepareData);
    return this.repo.save(dictionary);
  }

  async getDictionaryById(id: number) {
    const existDictionary = await this.repo.findOneBy({
      id,
    });

    if (!existDictionary) {
      throw new BadRequestException(`Словаря с id '${id}' еще не существует`);
    }

    const programExist = await this.programService.getProgramById(
      existDictionary.programId,
    );

    return {
      dOwner: programExist.ownerId,
      dName: existDictionary.name,
    };
  }
}
