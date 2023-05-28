import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
