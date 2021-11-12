import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) { }

  async create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    
    const order = this.orderRepository.create(createOrderDto);
    order.items = createOrderDto.items;
    console.log(order); 
    return this.orderRepository.save(order);
  }

  async findAll() {
    return this.orderRepository.find({ relations: ['items.product'] });
  }

  async findOne(id: number) {
    return this.orderRepository.findOne(id, { relations: ['items.product'] });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
