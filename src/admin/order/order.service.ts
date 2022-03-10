import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderProductsService } from '../orderProducts/orderProducts.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private orderProductsService: OrderProductsService,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create();
    const orderId = order.id;
    const items = createOrderDto.items;
    const orderProducts = await this.orderProductsService.add({ orderId, items })
    return this.orderRepository.save(order);
  }

  async findAll() {
    const orders = await this.orderRepository.find({ relations: ['products'] });
    return orders
  }

  async findOne(id: number) {
    return this.orderRepository.findOne(id);
  }

  async remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
