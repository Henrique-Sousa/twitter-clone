import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne,
} from 'typeorm';
import User from './User';

@Entity()
export default class Tweet {
  @PrimaryGeneratedColumn({ name: 'tweet_id' })
  id!: number;

  @ManyToOne(() => User, (user) => user.tweets, { nullable: false })
  user!: User;

  @Column({ type: 'varchar', length: 280, nullable: false })
  text!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
