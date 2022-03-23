import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductService } from "../product/product.service";
import { AdminRequired } from '../admin.decorator';

@Controller()
@AdminRequired()
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto);
    return order;
  }

  @Get()
  @Render('order')
  async findAll(@Query('id') id?: number) {
    let order;
    if (id) {
      order = await this.orderService.findOne(id)
    }
    const orderList = await this.orderService.findAll(1);
    return {
      order, orderList
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
