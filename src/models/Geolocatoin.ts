import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './Base';
import { User } from './User';

@Entity()
export class Geolocation extends Base {
  @PrimaryGeneratedColumn()
  id!: number;
  @ManyToOne(_ => User)
  @JoinColumn()
  user!: User;
  @Column('double')
  x!: number;
  @Column('double')
  y!: number;
  @Column('double')
  z!: number;
}
