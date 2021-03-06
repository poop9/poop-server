import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Base } from './Base';

@Entity()
@Unique(['uuid'])
export class User extends Base {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ length: 50 })
  nickname!: string;
  @Column()
  uuid!: string;
}
