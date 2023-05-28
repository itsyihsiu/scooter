import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scooter } from 'src/entities/scooter.entity';
import { CreateScooterParams, UpdateScooterParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ScootersService {
  constructor(
    @InjectRepository(Scooter) private scooterRepository: Repository<Scooter>,
  ) {}

  findScooters() {
    return this.scooterRepository.find();
  }

  async findScooterById(id: number) {
    const scooter = await this.scooterRepository.findOneBy({ id });
    if (!scooter) throw new BadRequestException(`id '${id}' not found`);
    return scooter;
  }

  createScooter(scooterDetails: CreateScooterParams) {
    const newScooter = this.scooterRepository.create({
      ...scooterDetails,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    return this.scooterRepository.save(newScooter);
  }

  async updateScooterById(
    id: number,
    updateScooterDetails: UpdateScooterParams,
  ) {
    const scooter = await this.scooterRepository.findOneBy({ id });
    if (!scooter) {
      throw new BadRequestException(`id '${id}' does not exist`);
    }

    return this.scooterRepository.save({
      id,
      ...updateScooterDetails,
      updatedAt: new Date(),
    });
  }

  deleteScooterById(id: number) {
    return this.scooterRepository.delete({ id });
  }
}
