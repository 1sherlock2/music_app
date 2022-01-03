import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  OneToOne
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Track } from './track.entity';
import { OrderTracks } from './orderTracks.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: object | string | Buffer;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToOne(() => OrderTracks, (orderTraks) => orderTraks.user)
  orderTracks: OrderTracks;

  @OneToMany(() => Track, (track) => track.user)
  tracks: Track[];

  @Column({ unique: true })
  nickname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;
}
