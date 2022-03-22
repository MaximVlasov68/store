import { Controller, Get, Post, Render, Request, Res, UseGuards, Param, Query, Body, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ProductService } from './admin/product/product.service';
import { CategoryService } from './admin/category/category.service';
import { RegisterUserDto } from "./users/dto/register-user-dto";
import { UsersService } from './users/users.service';
import { OrderService } from './admin/order/order.service';
import { CreateOrderDto } from './admin/order/dto/create-order.dto';
import { KeyNotUniqueException } from './common/exceptions';

@Controller()
export class AppController {

  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly usersService: UsersService,
    private readonly orderService: OrderService,
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

  @Post('auth/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      const user = await this.usersService.registerUser(registerUserDto);
      return user;
    } catch (e) {
      if (e.code = '23505') {
        const keyName = e.detail.match('".*"');
        throw new KeyNotUniqueException('user', keyName)
      }
      console.error('Registration error' + e);
      throw new BadRequestException();
    }
  }

  @Render('loginForm')
  @Get('login')
  async loginForm() { }

  @Render('main')
  @Get()
  async main() {
    const recommendedProducts = await this.productService.findAll();

    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    console.log(categoriesTree);

    return { recommendedProducts, categoriesTree }
  }

  @Render('productDetail')
  @Get('product/:id')

  async getProduct(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/

    return { product, categoriesTree }
  }

  @Render('productList')
  @Get('category/:id')
  async getProductList(@Param('id') id?: number) {
    const productList = await this.productService.findByCategory(id);
    const category = await this.categoryService.findOne(id);
    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/

    return { productList, category, categoriesTree }
  }

  @Render('cart')
  @Get('cart')
  async cart() {
    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    return { categoriesTree }
  }

  @Post('createOrder')
  async createOrder(createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto)
  }

  @Render('account')
  @Get('account')
  async account() {
    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    const orders = await this.orderService.findAll(1)
    return { categoriesTree, orders }
  }
}