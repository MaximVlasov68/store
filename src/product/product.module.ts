import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { CategoryModule } from 'src/category/category.module';
import { ManufacturerModule } from 'src/manufacturer/manufacturer.module';

@Module({
  imports:[
  MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  CategoryModule,
  ManufacturerModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
