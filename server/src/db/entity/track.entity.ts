import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

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

  @ManyToOne((type) => User, (user) => user.tracks)
  userId: User;
}
