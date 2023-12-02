import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cards', { schema: 'rnd-language' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'dictionary_id', nullable: true })
  dId: number;

  @Column({ name: 'native', nullable: true })
  native: string;

  @Column({ name: 'study', nullable: true })
  study: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  isLearn?: boolean;
}
