import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent } from 'src/entities/rent.entity';
import { Scooter } from 'src/entities/scooter.entity';
import { User } from 'src/entities/user.entity';
import { CreateRentParams } from 'src/utils/types';
import { Not, Repository } from 'typeorm';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Scooter) private scooterRepository: Repository<Scooter>,
    @InjectRepository(Rent) private rentRepository: Repository<Rent>,
  ) {}

  async findRents() {
    return this.rentRepository.find({
      relations: { user: true, scooter: true },
    });
  }

  async createRentRecord(createRentDetails: CreateRentParams) {
    const userId = createRentDetails.user;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new BadRequestException(`User ${userId} not found`);
    }

    const scooterId = createRentDetails.scooter;
    const scooter = await this.scooterRepository.findOneBy({
      id: scooterId,
    });
    if (!scooter) {
      throw new BadRequestException(`Scooter ${scooterId} not found`);
    }

    const userIsRenting =
      (await this.rentRepository
        .createQueryBuilder()
        .where('end IS NULL')
        .andWhere('userId = :userId', { userId })
        .getCount()) > 0;

    if (userIsRenting) {
      throw new BadRequestException(`User '${userId}' already rent a scooter`);
    }

    const scooterUnderUse =
      (await this.rentRepository
        .createQueryBuilder()
        .where('end IS NULL')
        .andWhere('scooterId = :scooterId', { scooterId })
        .getCount()) > 0;

    if (scooterUnderUse) {
      throw new BadRequestException(`Scooter '${scooterId}' is under use`);
    }

    const current = new Date();

    const newRent = this.rentRepository.create({
      start: current,
      updatedAt: current,
      createdAt: current,
      user,
      scooter,
    });

    return this.rentRepository.save(newRent);
  }

  async updateRentRecord(id: number) {
    const record = await this.rentRepository.findOneBy({
      id,
    });

    if (!record) {
      throw new BadRequestException(`Record ${id} not found`);
    }

    const current = new Date();

    return this.rentRepository
      .createQueryBuilder()
      .update(Rent)
      .set({ updatedAt: current, end: current })
      .where('id = :id', { id })
      .execute();
  }

  deleteAllRents() {
    return this.rentRepository.delete({});
  }

  deleteRentById(id: number) {
    return this.rentRepository.delete({ id });
  }
}
