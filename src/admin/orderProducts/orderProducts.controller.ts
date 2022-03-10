import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query } from '@nestjs/common';
import { OrderProductsService } from './orderProducts.service';
import { AddOrderItemsDto } from './dto/add-order-item.dto';
import { ProductService } from "../product/product.service";

@Controller()
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductsService, private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createOrderDto: AddOrderItemsDto) {
    const order = await this.orderProductService.add(createOrderDto);
    return order;
  }

  @Get()
  @Render('order')
  async findAll(@Query('id') id?: number) {
    let order;
    if (id) {
      order = await this.orderProductService.findOne(id)
    }
    const orderList = await this.orderProductService.findAll();
    return {
      order, orderList
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderProductService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderProductService.remove(+id);
  }
}
