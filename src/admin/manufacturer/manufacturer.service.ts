import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, ILike, Repository } from 'typeorm';
import { LoadTableParams } from '../interfaces/loadTableParams';
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
  async findAndCount({
    start,
    length,
    search,
    order,
  }: LoadTableParams = {}): Promise<[Manufacturer[], number]> {
    const where: FindConditions<Manufacturer>[] = [];

    const queryBuilder =
      this.manufacturerRepository.createQueryBuilder('manufacturer');

    if (search) {
      queryBuilder
        .where(`manufacturer.name ILIKE '%${search}%'`)
        .orWhere(`manufacturer.country ILIKE '%${search}%'`)
        .orWhere(`manufacturer.city ILIKE '%${search}%'`);
    }
    if (!isNaN(parseInt(search))) {
      queryBuilder.orWhere(`manufacturer.id = ${parseInt(search)}`);
    }

    if (order) {
      Object.entries(order).forEach(([column, order]) => {
        queryBuilder.orderBy(column, order);
      });
    }

    return queryBuilder.take(length).skip(start).getManyAndCount();
  }

  async count(): Promise<number> {
    return this.manufacturerRepository.count();
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
