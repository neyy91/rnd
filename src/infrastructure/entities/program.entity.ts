import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('programs', { schema: 'rnd-language' })
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'owner_id', nullable: true })
  ownerId: number;

  @Column({ name: 'pair_id', nullable: true })
  pairId: number;

  @Column({ name: 'name', nullable: true })
  name: string;
}
