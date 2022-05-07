import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseGuards,
  Param,
  Query,
  Body,
  BadRequestException,
  Session,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ProductService } from './admin/product/product.service';
import { CategoryService } from './admin/category/category.service';
import { RegisterUserDto } from './users/dto/register-user-dto';
import { UsersService } from './users/users.service';
import { OrderService } from './admin/order/order.service';
import { CreateOrderDto } from './admin/order/dto/create-order.dto';
import { KeyNotUniqueException } from './common/exceptions';
import { UserRoles } from './users/enums/roles';
import { LoadProductsDto } from './admin/product/dto/load-products.dto';
import { SessionAuthGuard } from './auth/session-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly usersService: UsersService,
    private readonly orderService: OrderService,
    private readonly authService: AuthService,
  ) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    if (req.user) {
      req.session.user = req.user;
    }
    const res = await this.authService.validateUser(
      req.body.username,
      req.body.password,
    );

    if (res === null) {
      return { user: null };
    }
    return { user: res.username };
  }

  @Get('/auth/logout')
  async logout(@Request() req, @Res() res: Response) {
    req.session.destroy();
    return res.redirect('/');
  }

  @Post('auth/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      const user = await this.usersService.registerUser(registerUserDto);
      return user;
    } catch (e) {
      if ((e.code = '23505')) {
        const keyName = e.detail.match('".*"');
        throw new KeyNotUniqueException('user', keyName);
      }
      console.error('Registration error' + e);
      throw new BadRequestException();
    }
  }

  @Render('main')
  @Get()
  async main(@Session() session) {
    const commonData = await this.getCommonData();
    const { recommendedItems, sliderItems } =
      await this.productService.getMainPageItems();
    const user = session.user;

    return { ...commonData, user, recommendedItems, sliderItems };
  }

  @Render('productDetail')
  @Get('product/:id')
  async getProduct(@Session() session, @Param('id') id: number) {
    const product = await this.productService.findOne(id);
    const commonData = await this.getCommonData();
    const user = session.user;

    return { ...commonData, product, user };
  }

  @Render('productList')
  @Get('category/:id')
  async getProductList(@Session() session, @Param('id') id: number) {
    const commonData = await this.getCommonData();
    const productList = await this.productService.findByCategory(id);
    const category = await this.categoryService.findOne(id);
    const user = session.user;

    return { ...commonData, productList, category, user };
  }

  @Render('cart')
  @Get('cart')
  async cart(@Session() session) {
    const commonData = await this.getCommonData();
    const user = session.user;
    return { ...commonData, user };
  }

  @UseGuards(SessionAuthGuard)
  @Render('account')
  @Get('account')
  async account(@Session() session) {
    const commonData = await this.getCommonData();
    const ordersInProgress = await this.orderService.findAll(
      session.user.id,
      false,
    );
    const completedOrders = await this.orderService.findAll(
      session.user.id,
      true,
    );
    const user = session.user;
    return { ...commonData, ordersInProgress, completedOrders, user };
  }

  @UseGuards(SessionAuthGuard)
  @Post('createOrder')
  async createOrder(
    @Body() createOrderDto: Omit<CreateOrderDto, 'userId'>,
    @Session() session,
  ) {
    return this.orderService.create({
      ...createOrderDto,
      userId: session.user.id,
    });
  }

  @Post('loadProducts')
  async loadProducts(@Body() loadProductsDto: LoadProductsDto) {
    const { count = 8 } = loadProductsDto;
    return this.productService.findAll(count);
  }

  protected async getCommonData() {
    /* Общие переменные для свех страниц */
    const categoriesTree =
      await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    const { headerItems, footerItems } =
      await this.categoryService.getMenuItems();
    return { categoriesTree, headerItems, footerItems };
  }
}
