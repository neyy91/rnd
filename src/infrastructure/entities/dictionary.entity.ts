import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dictionaries', { schema: 'rnd-language' })
export class Dictionary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'program_id', nullable: true })
  programId: number;

  @Column({ name: 'text', nullable: true })
  name: string;
}
