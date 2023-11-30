import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './role.entity';

@Entity('users', { schema: 'rnd-language' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'name' })
  name: string;

  @ManyToOne('Role', { nullable: false })
  @JoinColumn({ name: 'role', referencedColumnName: 'id' })
  role: Role;

  @Column({ name: 'role' })
  roleId: number;
}
