import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class TrackEntity {
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

  @ManyToOne(() => UserEntity, (user) => user.tracks)
  user: UserEntity;
}
