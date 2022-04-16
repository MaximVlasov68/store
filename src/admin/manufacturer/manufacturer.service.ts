import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './entities/manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
  ) {}

  async create(
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepository.create(
      createManufacturerDto,
    );
    return this.manufacturerRepository.save(manufacturer);
  }

  async findAll(): Promise<Manufacturer[]> {
    return this.manufacturerRepository.find();
  }

  async findOne(id: number): Promise<Manufacturer> {
    return this.manufacturerRepository.findOne(id);
  }

  async update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    return this.manufacturerRepository.update(id, updateManufacturerDto);
  }

  async remove(id: number) {
    return this.manufacturerRepository.delete(id);
  }
}
