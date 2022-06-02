import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, ILike, IsNull, Repository } from 'typeorm';
import { LoadTableParams } from '../interfaces/loadTableParams';
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
    const parentCategory = createCategoryDto.parentCategory
      ? await this.categoryRepository.findOne(createCategoryDto.parentCategory)
      : null;

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      parentCategory,
    });
    return this.categoryRepository.save(category);
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['parentCategory'] });
  }

  async findAndCount({
    start,
    length,
    search,
    order,
  }: LoadTableParams = {}): Promise<[Category[], number]> {
    const where: FindConditions<Category>[] = [];

    if (search) {
      where.push(
        ...[
          { name: ILike(`%${search}%`) },
          {
            parentCategory: {
              name: ILike(`%${search}%`),
            },
          },
        ],
      );
    }
    if (!isNaN(parseInt(search))) {
      where.push({
        id: parseInt(search),
      });
    }

    return this.categoryRepository.findAndCount({
      relations: ['parentCategory'],
      take: length,
      skip: start,
      where,
      order,
    });
  }

  async count(): Promise<number> {
    return this.categoryRepository.count();
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
    const parentCategory = updateCategoryDto.parentCategory
      ? await this.categoryRepository.findOne(updateCategoryDto.parentCategory)
      : null;

    return this.categoryRepository.update(updateCategoryDto.id, {
      ...updateCategoryDto,
      parentCategory,
    });
  }

  async remove(id: number): Promise<any> {
    return this.categoryRepository.delete(id);
  }
}
