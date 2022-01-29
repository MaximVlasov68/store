import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>, @InjectRepository(Product) private productRepository: Repository<Product>) { }

  async create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    const order = await this.orderRepository.create({
      ...createOrderDto,
      items: JSON.stringify(createOrderDto.items),
    });
    return this.orderRepository.save(order);
  }

  async findAll() {
    const orders = await this.orderRepository.find();
    return orders
  }

  async findOne(id: number) {
    return this.orderRepository.findOne(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, {
      ...updateOrderDto,
      items: JSON.stringify(updateOrderDto.items),
    }
    );
  }

  async remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
