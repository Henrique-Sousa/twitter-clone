import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne,
} from 'typeorm';
import User from './User';

@Entity()
export default class Tweet {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.tweets, { nullable: false })
  user!: User;

  @Column({ type: 'varchar', length: 280, nullable: false })
  text!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
