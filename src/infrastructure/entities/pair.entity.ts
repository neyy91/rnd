import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pairs', { schema: 'rnd-language' })
export class Pair {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'native_id', nullable: true })
  nativeId: number;

  @Column({ name: 'study_id', nullable: true })
  studyId: number;
}
