import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()

export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto);
    
    const parent = await this.categoryRepository.findOne(createCategoryDto.parent);
    console.log(parent);
    
    const category = await this.categoryRepository.create({
      ...createCategoryDto,
      parent,
    })
    return this.categoryRepository.save(category);
  }

  async findAll(onlyParent: boolean = false): Promise<Category[]> {
    if (onlyParent) {
      return this.categoryRepository.find({relations: ['parent'], where: {
        parent: IsNull()
      }});
    }
    return this.categoryRepository.find({relations: ['parent']});
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id, {relations: ['parent']});
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<any> {
    const parent = await this.categoryRepository.findOne(updateCategoryDto.parent);
    return this.categoryRepository.update(updateCategoryDto.id, {
      ...updateCategoryDto,
      parent,
    });
  }

  async remove(id: number): Promise<any> {
    return this.categoryRepository.delete(id);
  }
}
