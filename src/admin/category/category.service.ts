import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()

export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto)
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<any> {
    return this.categoryRepository.update(updateCategoryDto.id, updateCategoryDto);
  }

  async remove(id: number): Promise<any> {
    return this.categoryRepository.delete(id);
  }
}
