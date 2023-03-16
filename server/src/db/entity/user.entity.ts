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
import { TrackEntity } from './track.entity';
import { OrderTracksEntity } from './orderTracks.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: object | string | Buffer | number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToOne(() => OrderTracksEntity, (orderTraks) => orderTraks.user)
  orderTracks: OrderTracksEntity;

  @OneToMany(() => TrackEntity, (track) => track.user)
  tracks: TrackEntity[];

  @Column({ unique: true })
  nickname: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column('boolean', { default: false })
  banned: boolean;

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;

  @Column('boolean', { default: false })
  isEmailConfirmed: boolean;
}
