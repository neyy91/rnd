import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProgramCommand } from 'src/dto';
import { Program } from 'src/infrastructure';
import { PairService } from 'src/pair/pair.service';
import { RoleTypeKey } from 'src/roles/role-type-key.enum';
import { UsersService } from 'src/users/users.service';
import { Repository, In } from 'typeorm';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private repo: Repository<Program>,
    private userService: UsersService,
    private pairService: PairService,
  ) {}

  async getPrograms(user?) {
    if (!user) {
      const allPrograms = await this.getProgramByIds();

      return allPrograms;
    }

    switch (user.roleName) {
      case RoleTypeKey.teacher:
        const programs = await this.repo.find({
          where: {
            ownerId: user.id,
          },
        });

        return await this.getProgramByIds(programs.map((x) => x.id));

      case RoleTypeKey.student:
        throw new BadRequestException('Программа студентов в подписках');

      default:
        return this.repo.find();
    }
  }

  async addProgram(command: CreateProgramCommand, user) {
    if (user.roleName !== RoleTypeKey.teacher) {
      throw new BadRequestException('Программа создается только учителем');
    }

    const exist = await this.repo.findOneBy({
      ownerId: user.userId,
      ...command,
    });

    if (exist) {
      throw new BadRequestException('Программа уже существует');
    }

    const program = this.repo.create({
      ownerId: user.userId,
      ...command,
    });
    return this.repo.save(program);
  }

  async getProgramById(id: number) {
    return this.repo.findOneBy({
      id,
    });
  }

  async getProgramByIds(ids?: number[]) {
    let req = {};

    if (ids && ids.length) {
      req = {
        where: {
          id: In(ids),
        },
      };
    }

    const programs = await this.repo.find(req);

    const owners = await this.userService.findByIds(
      Array.from(new Set(programs.map((x) => x.ownerId))),
    );

    const pairs = await this.pairService.getPairsByIds(
      Array.from(new Set(programs.map((x) => x.pairId))),
    );

    return programs.map((x) => {
      return {
        id: x.id,
        pairName: pairs.find((y) => y.pairId === x.pairId).pairName,
        pairId: x.pairId,
        name: x.name,
        ownerName: owners.find((y) => y.id === x.ownerId).name,
        ownerId: x.ownerId,
      };
    });
  }

  async removeProgram(id, user) {
    const exist = await this.repo.findOne({
      where: {
        id,
        ownerId: user.userId,
      },
    });

    if (exist) {
      throw new BadRequestException(
        'Программа уже существует или у нее другой владелец',
      );
    }

    return this.repo.remove(exist);
  }
}
