import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScootersService } from './scooters.service';
import { CreateScooterDto } from 'src/dto/create-scooter.dto';
import { UpdateScooterDto } from 'src/dto/update-scooter.dto';
import { ValidateDateOfManufacturePipe } from 'src/pipes/validate-date-of-manufacture.pipe';

@Controller('scooters')
export class ScootersController {
  constructor(
    @Inject('SCOOTERS_SERVICE')
    private readonly scootersService: ScootersService,
  ) {}

  @Get()
  async getScooters() {
    const scooters = await this.scootersService.findScooters();
    return scooters;
  }

  @Get(':id')
  getScooterById(@Param('id', ParseIntPipe) id: number) {
    return this.scootersService.findScooterById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createScooter(
    @Body(ValidateDateOfManufacturePipe) createScooterDto: CreateScooterDto,
  ) {
    return this.scootersService.createScooter(createScooterDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateDateOfManufacturePipe) updateScooterDto: UpdateScooterDto,
  ) {
    return this.scootersService.updateScooterById(id, updateScooterDto);
  }

  @Delete(':id')
  async deleteScooterById(@Param('id', ParseIntPipe) id: number) {
    await this.scootersService.deleteScooterById(id);
  }
}
