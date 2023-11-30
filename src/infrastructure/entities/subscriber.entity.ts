import { PrimaryColumn, Entity } from 'typeorm';

@Entity('subscribers', { schema: 'rnd-language' })
export class Subscriber {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'program_id' })
  programId: number;
}
