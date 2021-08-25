import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  OneToMany
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Track } from './track.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: object | string | Buffer;

  @Column({ unique: true })
  nickname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @OneToMany(() => Track, (track) => track.userId)
  tracks: Track[];

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
