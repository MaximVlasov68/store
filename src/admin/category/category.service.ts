import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()

export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const parent = await this.categoryRepository.findOne(createCategoryDto.parent);
    const category = await this.categoryRepository.create({
      ...createCategoryDto,
      parentCategory: parent,
    })
    return this.categoryRepository.save(category);
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['parent'] });
  }
  
  async getRoots(): Promise<Category[]> {
      return this.categoryRepository.find({
        where: {
          parentCategory: IsNull()
        },
        relations: ['parentCategory'], 
      });
  }
  
  async getTree(): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        parentCategory: IsNull()
      },
      relations: ['childCategories']
    });
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id, { relations: ['parentCategory'] });
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<any> {
    const parent = await this.categoryRepository.findOne(updateCategoryDto.parent);
    return this.categoryRepository.update(updateCategoryDto.id, {
      ...updateCategoryDto,
      parentCategory: parent,
    });
  }

  async remove(id: number): Promise<any> {
    return this.categoryRepository.delete(id);
  }
}
