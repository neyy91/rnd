import { RoleTypeKey } from 'src/roles/role-type-key.enum';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('roles', { schema: 'rnd-language' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: true })
  name: RoleTypeKey;

  @OneToMany('User', 'roleId')
  user: User;
}
