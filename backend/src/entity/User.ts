import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  nickname!: string;

  constructor(id: number, name: string, nickname: string) {
    this.name = name;
    this.nickname = nickname;
  }
}
