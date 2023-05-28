import { PASSWORD_LENGTH, USERNAME_LENGTH } from 'src/utils/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
