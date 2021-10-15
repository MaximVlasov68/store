import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Render, Query } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createOrUpdate(@Res() res: Response, @Body() createOrUpdateCategoryDto: CreateCategoryDto & UpdateCategoryDto) {
    if(createOrUpdateCategoryDto.id){
      await this.categoryService.update(createOrUpdateCategoryDto.id, createOrUpdateCategoryDto);
    } else {
      console.log(await this.categoryService.create(createOrUpdateCategoryDto));
    }
    
    return res.redirect('/category')
    
  }

  @Get()
  @Render('category')
  async findAll(@Query('id') id?: string) {
    let category
    if(id){
      category = await this.categoryService.findOne(id);
    } 
      const categoryList = await this.categoryService.findAll();
      return {categoryList, category};
  
  }
  
  @Get(':id/delete')
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.categoryService.remove(id);
    return res.redirect('/category');
  }
}
  