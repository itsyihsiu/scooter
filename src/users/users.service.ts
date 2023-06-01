import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent } from 'src/entities/rent.entity';
import { User } from 'src/entities/user.entity';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Rent) private rentRepository: Repository<Rent>,
  ) {}

  findUsers() {
    return this.userRepository.find();
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException(`id '${id}' not found`);
    return user;
  }

  async findUserUsage(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException(`User '${id}' not found`);

    let result = await this.rentRepository
      .createQueryBuilder()
      .orderBy('start', 'ASC')
      .select('start')
      .addSelect('end')
      .addSelect('scooterId', 'scooter')
      .where('userId = :id', { id })
      .getRawMany();

    result = result.map((entry) => {
      const start = entry.start;
      const end = entry.end || new Date();
      return {
        ...entry,
        duration: moment.duration((end - start) / 1000).asMinutes(),
      };
    });

    return result;
  }

  async createUser(userDetails: CreateUserParams) {
    const username = userDetails.username;
    const user = await this.userRepository.findOneBy({ username });
    if (user) {
      throw new HttpException(
        `duplicate username '${username}'`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = this.userRepository.create({
      ...userDetails,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  async updateUserById(id: number, updateUserDetails: UpdateUserParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException(`id '${id}' does not exist`);
    }
    const username = updateUserDetails.username;
    if (username) {
      const target = await this.userRepository.findOneBy({ username });
      if (target) {
        throw new BadRequestException(`duplicate username '${username}'`);
      }
    }

    return this.userRepository.save({
      id,
      ...updateUserDetails,
      updatedAt: new Date(),
    });
  }

  deleteAllUser() {
    return this.userRepository.delete({});
  }

  deleteUserById(id: number) {
    return this.userRepository.delete({ id });
  }
}
