import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class OrderTracksEntity {
  @PrimaryGeneratedColumn()
  id: object | string | Buffer | number;

  @Column('jsonb', { nullable: true, default: [] })
  order: number[];

  @OneToOne(() => UserEntity, (user) => user.orderTracks)
  @JoinColumn()
  user: UserEntity;
}
