import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  CategoryModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
