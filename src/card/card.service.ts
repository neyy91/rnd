import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import { AddCardCommand, LearnCardCommand } from 'src/dto';
import { Card, Progress } from 'src/infrastructure';
import { RoleTypeKey } from 'src/roles/role-type-key.enum';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private repo: Repository<Card>,
    @InjectRepository(Progress)
    private progressRepo: Repository<Progress>,
    private dService: DictionaryService,
  ) {}

  async getCards(dId: number, user) {
    const progressInfo = await this.progressRepo.findBy({
      dId,
      userId: user.userId,
    });

    const cards = await this.repo.find({
      where: {
        dId,
      },
    });

    cards.forEach((card) => {
      card.isLearn =
        user.roleName !== RoleTypeKey.student
          ? null
          : !!progressInfo.find((x) => x.cardId === card.id);
      return card;
    });
    return cards;
  }

  async addCard(dId: number, command: AddCardCommand, user) {
    if (user.roleName !== RoleTypeKey.teacher) {
      throw new BadRequestException('Карточки добавляет только учитель');
    }

    const dInfo = await this.dService.getDictionaryById(dId);

    if (dInfo.dOwner !== user.userId) {
      throw new BadRequestException(
        `Добавить карточку в словарь '${dInfo.dName}' может только владелец`,
      );
    }

    const card = this.repo.create({
      dId,
      ...command,
    });
    return this.repo.save(card);
  }

  async learnCard(dId: number, command: LearnCardCommand, user) {
    if (user.roleName !== RoleTypeKey.student) {
      throw new BadRequestException('Карточку выучить может только студент');
    }

    const cardExist = await this.repo.findOneBy({
      id: command.cardId,
    });

    if (!cardExist) {
      throw new BadRequestException('Карточки не существует');
    }

    const progressInfo = await this.progressRepo.findOneBy({
      cardId: command.cardId,
      userId: user.userId,
    });

    if (progressInfo) {
      throw new BadRequestException('Карточка пользователем уже изучена');
    }

    const pCard = this.progressRepo.create({
      dId,
      cardId: command.cardId,
      userId: user.userId,
    });
    return this.progressRepo.save(pCard);
  }
}
