import { PASSWORD_LENGTH, USERNAME_LENGTH } from 'src/utils/constants';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rent } from './rent.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: USERNAME_LENGTH, unique: true })
  username: string;

  @Column({ length: PASSWORD_LENGTH })
  password: string;

  @Column()
  updatedAt: Date;

  @Column()
  createdAt: Date;

  @OneToMany(() => Rent, (rent) => rent.user)
  rents: Rent[];
}
