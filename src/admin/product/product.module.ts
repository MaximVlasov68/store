import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoryModule,
    ManufacturerModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductModule, ProductService],
})
export class ProductModule {}
