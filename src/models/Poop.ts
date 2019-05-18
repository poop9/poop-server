import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './Base';
import { User } from './User';

@Entity()
export class Poop extends Base {
  @PrimaryGeneratedColumn()
  id!: number;
  @ManyToOne(_ => User)
  user!: User;
}
