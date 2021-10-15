import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports:[CategoryService]
})
export class CategoryModule {}

