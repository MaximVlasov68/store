import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const parentCategory = await this.categoryRepository.findOne(
      createCategoryDto.parentCategory,
    );
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      parentCategory,
    });
    return this.categoryRepository.save(category);
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['parentCategory'] });
  }

  async getRoots(): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        parentCategory: IsNull(),
      },
      relations: ['parentCategory'],
    });
  }

  async getTree(): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        parentCategory: IsNull(),
      },
      relations: ['childCategories'],
    });
  }

  async getMenuItems(): Promise<{
    headerItems: Category[];
    footerItems: Category[];
  }> {
    const headerItems = await this.categoryRepository.find({
      where: {
        showInHeader: true,
      },
    });
    const footerItems = await this.categoryRepository.find({
      where: {
        showInFooter: true,
      },
    });
    return { headerItems, footerItems };
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id, {
      relations: ['parentCategory'],
    });
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<any> {
    const parentCategory = await this.categoryRepository.findOne(
      updateCategoryDto.parentCategory,
    );
    return this.categoryRepository.update(updateCategoryDto.id, {
      ...updateCategoryDto,
      parentCategory,
    });
  }

  async remove(id: number): Promise<any> {
    return this.categoryRepository.delete(id);
  }
}
