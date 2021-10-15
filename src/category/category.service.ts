import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()

export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>){}

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = new this.categoryModel(createCategoryDto)
    console.log(createCategoryDto);
    
    return createdCategory.save();
  }

  findAll() {
    return this.categoryModel.find();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.updateOne({_id: id}, updateCategoryDto);
  }

  async remove(id: string) {
    return this.categoryModel.deleteOne({_id: id});
  }
}
