import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany, CreateDateColumn, DeleteDateColumn,
} from 'typeorm';
import Tweet from './Tweet';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 50, nullable: false })
  name!: string;

  @Column({ length: 15, nullable: false })
  username!: string;

  @Column({ length: 128, nullable: false })
  password!: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets?: Tweet[];

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
