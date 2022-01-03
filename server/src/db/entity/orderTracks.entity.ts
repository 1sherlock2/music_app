import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class OrderTracks {
  @PrimaryGeneratedColumn()
  id: object | string | Buffer;

  @Column('jsonb', { nullable: true })
  order: number[];

  @OneToOne(() => User, (user) => user.orderTracks)
  @JoinColumn()
  user: User;
}
