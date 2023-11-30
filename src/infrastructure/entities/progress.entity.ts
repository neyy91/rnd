import { PrimaryColumn, Entity, Column } from 'typeorm';

@Entity('progress', { schema: 'rnd-language' })
export class Progress {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'dictionary_id' })
  dId: number;

  @Column({ name: 'card_id' })
  cardId: number;
}
