import { Controller, Get, Post, Render, Request, Res, UseGuards, Param, Query, Body, BadRequestException, Session } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ProductService } from './admin/product/product.service';
import { CategoryService } from './admin/category/category.service';
import { RegisterUserDto } from "./users/dto/register-user-dto";
import { UsersService } from './users/users.service';
import { OrderService } from './admin/order/order.service';
import { CreateOrderDto } from './admin/order/dto/create-order.dto';
import { KeyNotUniqueException } from './common/exceptions';
import { UserRoles } from './users/enums/roles';

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
    if (req.user) {
      req.session.user = req.user;
    }
    if (req.user.role === UserRoles.admin) {   
      return res.redirect('/admin');
    } else {
      return res.redirect('/account');
    }
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
  async main(@Session() session) {
    const recommendedProducts = await this.productService.findAll();
    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    const user = session.user;

    return { recommendedProducts, categoriesTree, user }
  }

  @Render('productDetail')
  @Get('product/:id')

  async getProduct(@Session() session, @Param('id') id: number) {
    const product = await this.productService.findOne(id);
    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    const user = session.user;

    return { product, categoriesTree, user }
  }

  @Render('productList')
  @Get('category/:id')
  async getProductList(@Session() session, @Param('id') id?: number) {
    const productList = await this.productService.findByCategory(id);
    const category = await this.categoryService.findOne(id);
    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    const user = session.user;

    return { productList, category, categoriesTree, user }
  }

  @Render('cart')
  @Get('cart')
  async cart(@Session() session) {
    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    const user = session.user;
    return { categoriesTree, user }
  }

  @Post('createOrder')
  async createOrder(@Body() createOrderDto: Omit<CreateOrderDto, 'userId'>, @Session() session) {
    return this.orderService.create({
      ...createOrderDto,
      userId: session.user.id,
    })
  }

  @Render('account')
  @Get('account')
  async account(@Session() session) {
    const categoriesTree = await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    const orders = await this.orderService.findAll(session.user.id)
    const user = session.user;
    return { categoriesTree, orders, user }
  }
}