import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Scooter } from './scooter.entity';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  start: Date;

  @Column({ type: 'datetime', nullable: true })
  end: Date;

  @Column()
  updatedAt: Date;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.rents)
  user: User;

  @ManyToOne(() => Scooter, (scooter) => scooter.rents)
  scooter: Scooter;
}
