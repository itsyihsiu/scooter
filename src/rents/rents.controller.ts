import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RentsService } from './rents.service';
import { CreateRentDto } from 'src/dto/create-rent.dto';

@Controller('rents')
export class RentsController {
  constructor(private rentsService: RentsService) {}

  @Get()
  async getRents() {
    return this.rentsService.findRents();
  }

  @Post('rent')
  @UsePipes(new ValidationPipe())
  createRentRecord(@Body() createRentDto: CreateRentDto) {
    return this.rentsService.createRentRecord(createRentDto);
  }

  @Post('return/:id')
  updateRentRecord(@Param('id', ParseIntPipe) id: number) {
    return this.rentsService.updateRentRecord(id);
  }

  @Delete('all')
  async deleteAllRents() {
    await this.rentsService.deleteAllRents();
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.rentsService.deleteRentById(id);
  }
}
