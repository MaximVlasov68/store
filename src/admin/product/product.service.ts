import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, ILike, Repository } from 'typeorm';
import { LoadTableParams } from '../interfaces/loadTableParams';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(search?: string): Promise<Product[]> {
    if (search) {
      return this.productRepository.find({
        relations: ['category', 'manufacturer'],
        where: {
          productName: ILike(`%${search}%`),
        },
      });
    }
    return this.productRepository.find({
      relations: ['category', 'manufacturer'],
    });
  }

  async findAndCount({
    start,
    length,
    search,
    order,
  }: LoadTableParams = {}): Promise<[Product[], number]> {
    const where: FindConditions<Product>[] = [];

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.manufacturer', 'manufacturer');

    if (search) {
      queryBuilder
        .where(`product.productName ILIKE '%${search}%'`)
        .orWhere(`product.color ILIKE '%${search}%'`)
        .orWhere(`category.name ILIKE '%${search}%'`)
        .orWhere(`manufacturer.name ILIKE '%${search}%'`);
    }
    if (!isNaN(parseInt(search))) {
      queryBuilder.orWhere(`product.price = ${parseInt(search)}`);
    }
    if (!isNaN(parseFloat(search))) {
      queryBuilder.orWhere(`product.weight = ${parseFloat(search)}`);
    }

    if (order) {
      Object.entries(order).forEach(([column, order]) => {
        const parsedColumnName =
          column.split('.'); /* разбить строку по нахождению . на  элементы*/

        if (parsedColumnName.length === 1) {
          parsedColumnName.unshift('product');
        }

        queryBuilder.orderBy(parsedColumnName.join('.'), order);
      });
    }

    return queryBuilder.take(length).skip(start).getManyAndCount();
  }

  async count(): Promise<number> {
    return this.productRepository.count();
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
      relations: ['category', 'manufacturer'],
    });
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id, {
      relations: ['category', 'manufacturer'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return this.productRepository.delete(id);
  }

  async getMainPageItems(
    takeRecommended?: number,
    page?: number,
  ): Promise<{
    sliderItems: Product[];
    recommendedItems: Product[];
  }> {
    const sliderItems = await this.productRepository.find({
      where: {
        showInSlider: true,
      },
      relations: ['category'],
    });
    const recommendedItems = await this.productRepository.find({
      where: {
        showInRecommended: true,
      },
      relations: ['category'],
      take: takeRecommended,
      skip: (page - 1) * takeRecommended,
      /* для бека, чтобы первый элемент для меня был 1, а для него 0 */
    });
    return { sliderItems, recommendedItems };
  }
}
