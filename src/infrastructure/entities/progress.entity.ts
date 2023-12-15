import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('progress', { schema: 'rnd-language' })
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'dictionary_id' })
  dId: number;

  @Column({ name: 'card_id' })
  cardId: number;
}
