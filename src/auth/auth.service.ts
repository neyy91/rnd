import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateBasicAccountCommand } from 'src/dto';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/infrastructure';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private roleService: RolesService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registration(command: CreateBasicAccountCommand) {
    const exist = await this.usersService.findByEmail(command.email);

    if (exist) {
      throw new BadRequestException('Email уже используется');
    }

    const role = await this.roleService.findOne(command.role);

    if (!role) {
      throw new BadRequestException('Роли не существует');
    }

    const user = await this.usersService.createUser(command, role);

    const payload = { email: command.email, roleName: role.name, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: User) {
    const role = await this.roleService.findOne(user.roleId);

    const payload = {
      email: user.email,
      roleName: role.name,
      id: user.id,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
