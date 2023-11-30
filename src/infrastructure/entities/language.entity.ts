import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('languages', { schema: 'rnd-language' })
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'iso2', nullable: true })
  iso2: string;
}
