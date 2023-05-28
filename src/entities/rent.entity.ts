import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  scooterId: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  totalRentedTime: string;

  @Column()
  createdAt: Date;
}
