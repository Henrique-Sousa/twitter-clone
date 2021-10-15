import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany, CreateDateColumn,
} from 'typeorm';
import Tweet from './Tweet';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, nullable: false })
  name!: string;

  @Column({ unique: true, length: 15, nullable: false })
  username!: string;

  @Column({ length: 128, nullable: false, select: false })
  password!: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets?: Tweet[];

  @CreateDateColumn()
  createdAt!: Date;
}
