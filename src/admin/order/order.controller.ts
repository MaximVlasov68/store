import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductService } from '../product/product.service';
import { AdminRequired } from '../admin.decorator';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';

@Controller()
@AdminRequired()
@UseGuards(SessionAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto);
    return order;
  }

  @Get()
  @Render('order')
  async findAll() {
    const orderList = await this.orderService.findAll();
    return { orderList };
  }

  @Post('/complete/:id')
  complete(@Param('id') id: number) {
    return this.orderService.setCompleted(id);
  }
}
