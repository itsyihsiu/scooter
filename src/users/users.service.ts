import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findUsers() {
    return this.userRepository.find();
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException(`id '${id}' not found`);
    return user;
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
