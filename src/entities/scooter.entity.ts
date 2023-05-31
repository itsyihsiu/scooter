import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rent } from './rent.entity';

@Entity()
export class Scooter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateOfManufacture: string;

  @Column({ default: 0 })
  usageTime: number;

  // @Column()
  // detail: string;

  // @Column()
  // photo: string;

  // @Column()
  // description: string;

  @Column()
  updatedAt: Date;

  @Column()
  createdAt: Date;

  @OneToMany(() => Rent, (rent) => rent.scooter)
  rents: Rent[];
}
