import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect, Res, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { CategoryService } from 'src/category/category.service';
import { ManufacturerService } from 'src/manufacturer/manufacturer.service';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';

@Controller('product')
@UseGuards(SessionAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly categoryService: CategoryService, private readonly manufacturerService: ManufacturerService) {}

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
      const manufacturerList = await this.manufacturerService.findAll();
      const productList = await this.productService.findAll();
      
      return {productList, categoryList, manufacturerList, product};
  
  }
  
  @Get(':id/delete')
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.productService.remove(id);
    return res.redirect('/product');
  }
}
