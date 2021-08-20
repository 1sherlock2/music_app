import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  artist: string;

  @Column({ nullable: true })
  img: string;

  // @Column('int')
  // views: number;

  @Column()
  audio: string;
}
