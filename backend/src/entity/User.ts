import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany, CreateDateColumn,
} from 'typeorm';
import Tweet from './Tweet';

@Entity()
export default class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id!: number;

  @Column({ length: 50, nullable: false })
  name!: string;

  @Column({ unique: true, length: 15, nullable: false })
  username!: string;

  @Column({ length: 128, nullable: false, select: false })
  password!: string;

  @Column({ name: 'photo_url', length: 255, nullable: true })
  photoUrl?: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets?: Tweet[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
