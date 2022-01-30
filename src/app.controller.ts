import { Controller, Get, Post, Render, Request, Res, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ProductService } from './admin/product/product.service';


@Controller()
export class AppController {

  constructor(private readonly productService: ProductService) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req, @Res() res: Response) {
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
    console.log(recommendedProducts);
    
    return { recommendedProducts }
  }

  @Render('productDetail')
  @Get('product/:id')
  async getProduct(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    return {product}
  }
}
