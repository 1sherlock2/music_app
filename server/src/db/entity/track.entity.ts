import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  artist: string;

  @Column({ nullable: true })
  img: string;

  @Column({ nullable: true })
  audio: string;

  @ManyToOne(() => User, (user) => user.tracks)
  user: User;
}
