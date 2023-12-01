import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeCommand } from 'src/dto';
import { Subscriber } from 'src/infrastructure';
import { ProgramService } from 'src/program/program.service';
import { RoleTypeKey } from 'src/roles/role-type-key.enum';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private repo: Repository<Subscriber>,
    private programService: ProgramService,
  ) {}

  async getSubscriptions(user) {
    if (user.roleName !== RoleTypeKey.student) {
      throw new Error('Подписки только для студентов');
    }

    const subs = await this.repo.findBy({
      userId: user.userId,
    });

    return this.programService.getProgramByIds(subs.map((x) => x.programId));
  }

  async subscribe(command: SubscribeCommand, user) {
    const exist = await this.repo.findOneBy({
      userId: user.userId,
      programId: command.programId,
    });

    if (exist) {
      throw new Error('Вы уже подписаны на эту программу');
    }

    const programExist = await this.programService.getProgramById(
      command.programId,
    );

    if (!programExist) {
      throw new Error('Такой программы еще нет');
    }

    const sub = this.repo.create({
      userId: user.userId,
      programId: command.programId,
    });
    return this.repo.save(sub);
  }
}
