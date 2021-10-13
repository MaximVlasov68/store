import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()

export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>){}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto)
    return createdProduct.save();
  }

  findAll() {
    return this.productModel.find();
  }

  async findOne(id: string) {
    return this.productModel.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.updateOne({_id: id}, updateProductDto);
  }

  async remove(id: string) {
    return this.productModel.deleteOne({_id: id});
  }
}
