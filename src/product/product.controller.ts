import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect, Res, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { CategoryService } from 'src/category/category.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly categoryService: CategoryService) {}

  @Post()
  async createOrUpdate(@Res() res: Response, @Body() createOrUpdateProductDto: CreateProductDto & UpdateProductDto) {
    if(createOrUpdateProductDto.id){
      await this.productService.update(createOrUpdateProductDto.id, createOrUpdateProductDto);
    } else {
      await this.productService.create(createOrUpdateProductDto);
    }
    console.log(createOrUpdateProductDto);
    
    return res.redirect('/product')
    
  }

  @Get()
  @Render('product')
  async findAll(@Query('id') id?: string) {
    let product
    if(id){
      product = await this.productService.findOne(id);
    } 
      const categoryList = await this.categoryService.findAll();
      const productList = await this.productService.findAll();
      return {productList, categoryList, product};
  
  }
  
  @Get(':id/delete')
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.productService.remove(id);
    return res.redirect('/product');
  }
}
