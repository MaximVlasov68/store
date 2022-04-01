import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(options: { take?: number } = {}): Promise<Product[]> {
    const { take = 10 } = options;
    return this.productRepository.find({ relations: ['category', 'manufacturer'], take })
  }
 
  async findByCategory(categoryId: number): Promise<Product[]> {
    return this.productRepository.find({ 
      where: {
        category: {
          id: categoryId,
        }
      },
      relations: ['category', 'manufacturer'] })
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id, { relations: ['category', 'manufacturer'] })
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return this.productRepository.delete(id);
  }
}

export interface UpdateProductParams extends UpdateProductDto {
  id: number;
}
