import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Render, Query } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async createOrUpdate(@Res() res: Response, @Body() createOrUpdateCategoryDto: CreateCategoryDto | UpdateCategoryDto) {
    if ("id" in createOrUpdateCategoryDto) {
      await this.categoryService.update(createOrUpdateCategoryDto as UpdateCategoryDto);
    } else {
      await this.categoryService.create(createOrUpdateCategoryDto as CreateCategoryDto);
    }
    return res.redirect('/admin/category')
  }

  @Get()
  @Render('category')
  async find(@Query('id') id?: number) {
    let category: Category | null;
    if (id) {
      category = await this.categoryService.findOne(id);
    }
    const categoryList = await this.categoryService.findAll();
    return { categoryList, category };

  }

  @Get(':id/delete')
  async remove(@Res() res: Response, @Param('id') id: number) {
    await this.categoryService.remove(id);
    return res.redirect('/admin/category');
  }
}
