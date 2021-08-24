import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Track } from './track.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany((type) => Track, (user) => user.userId)
  tracks: Track[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
