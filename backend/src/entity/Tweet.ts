import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import User from './User';

@Entity()
export default class Tweet {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.tweets, { nullable: false })
  user!: User;

  @Column({ type: 'varchar', length: 280 })
  text!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
