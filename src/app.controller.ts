import { Controller, Get, Post, Render, Request, Res, UseGuards, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ProductService } from './admin/product/product.service';
import { CategoryService } from './admin/category/category.service';

@Controller()
export class AppController {

  constructor(
    private readonly productService: ProductService, private readonly categoryService: CategoryService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req, @Res() res: Response) {
    console.log(req);

    if (req.user) {
      req.session.user = req.user;
    }
    return res.redirect('/admin');
  }

  @Render('loginForm')
  @Get('login')
  async loginForm(@Res() res: Response) { }

  @Render('main')
  @Get()
  async main() {
    const recommendedProducts = await this.productService.findAll();

    const categories = await this.categoryService.getRoots(); /* родительская категория */
    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    console.log(categoriesTree);
    
    return { recommendedProducts, categories, categoriesTree }
  }

  @Render('productDetail')
  @Get('product/:id')

  async getProduct(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    return { product }
  }
  
  @Render('productList')
  @Get('productList')
  async getProductList(@Query('categoryId') categoryId?: number) {
    const productList = await this.productService.findByCategory(categoryId);
    return { productList }
  }
}
