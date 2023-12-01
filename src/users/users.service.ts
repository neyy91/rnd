import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBasicAccountCommand } from 'src/dto';
import { Role, User } from 'src/infrastructure';
import { Repository, In } from 'typeorm';

// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByIds(ids: number[]): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async createUser(command: CreateBasicAccountCommand, role: Role) {
    const user = this.usersRepository.create({
      email: command.email,
      name: command.name,
      password: command.password,
      role,
    });

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
