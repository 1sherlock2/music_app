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

  @Column()
  audio: string;

  @Column({ nullable: true })
  full_hd_audio: string;

  @Column({ nullable: true })
  hd_audio: string;

  @ManyToOne(() => User, (user) => user.tracks)
  userId: string | number;


  // @Column('int')
  // views: number;
}
