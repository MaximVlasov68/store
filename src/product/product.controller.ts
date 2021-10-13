import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect, Res, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createOrUpdate(@Res() res: Response, @Body() createOrUpdateProductDto: CreateProductDto & UpdateProductDto) {
    if(createOrUpdateProductDto.id){
      await this.productService.update(createOrUpdateProductDto.id, createOrUpdateProductDto);
    } else {
      await this.productService.create(createOrUpdateProductDto);
    }
    return res.redirect('/product')
    
  }

  @Get()
  @Render('product')
  async findAll(@Query('id') id?: string) {
    let product
    if(id){
      product = await this.productService.findOne(id);
    } 
      const productList = await this.productService.findAll();
      return {productList, product};
  
  }

  @Get(':id')
  @Render('product')
  findOne(@Param('name') name: string) {
    return this.productService.findOne(name);
  }

  

  @Get(':id/delete')
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.productService.remove(id);
    return res.redirect('/product');
  }
}
