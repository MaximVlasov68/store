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
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductService } from '../product/product.service';
import { AdminRequired } from '../admin.decorator';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';
import { LoadTableItems } from '../interfaces/loadTableItems.dto';

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

  @Post('loadItems')
  async loadItems(
    @Body() loadTableItemsDto: LoadTableItems,
    @Body('draw', ParseIntPipe)
    draw: number /* приведение draw к типу number */,
  ) {
    const { start, length, search, columns, order } = loadTableItemsDto;

    const ordering = Object.fromEntries(
      order.map((orderElement) => [
        columns[orderElement.column].data,
        orderElement.dir.toUpperCase() as 'ASC' | 'DESC',
      ]),
    );
    console.log(ordering);

    const [data, recordsFiltered] = await this.orderService.findAndCount({
      start,
      length,
      search: search.value,
      order: ordering,
    });
    const recordsTotal = await this.orderService.count();
    return { data, draw, recordsTotal, recordsFiltered };
  }

  @Post('/complete/:id')
  complete(@Param('id') id: number) {
    return this.orderService.setCompleted(id);
  }
}
