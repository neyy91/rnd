import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProgramCommand } from 'src/dto';
import { Program } from 'src/infrastructure';
import { RoleTypeKey } from 'src/roles/role-type-key.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private repo: Repository<Program>,
  ) {}

  async getPrograms(user?) {
    if (!user) {
      return this.repo.find();
    }

    switch (user.roleName) {
      case RoleTypeKey.teacher:
        return this.repo.find({
          where: {
            ownerId: user.id,
          },
        });

      case RoleTypeKey.student:
        break;

      default:
        return this.repo.find();
    }
  }

  async addProgram(command: CreateProgramCommand, user) {
    const exist = await this.repo.findOneBy(command);

    if (exist) {
      throw new Error('Программа уже существует');
    }

    const lang = this.repo.create(command);
    return this.repo.save(lang);
  }
}
