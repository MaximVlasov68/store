import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderProductsService } from '../orderProducts/orderProducts.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private orderProductsService: OrderProductsService,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const userId = createOrderDto.userId
    const user = await this.userRepository.findOne(userId)

    const order = await this.orderRepository.create({ user });
    const { id: orderId } = await this.orderRepository.save(order);

    const items = createOrderDto.items;
    const orderProducts = await this.orderProductsService.add({ orderId, items })
    return this.orderRepository.save(order);
  }

  async findAll(userId?: number) {
    let orders = this.orderRepository
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .leftJoinAndSelect("order.user", "user");
    if (userId) {
      orders = orders.where("user.id = :userId", { userId })
    }
    return orders.getMany()
  }

  async findOne(id: number) {
    return this.orderRepository.findOne(id);
  }

  async remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
