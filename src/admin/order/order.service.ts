import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderProductsService } from '../orderProducts/orderProducts.service';
import { User } from 'src/users/entities/user.entity';
import { LoadTableParams } from '../interfaces/loadTableParams';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private orderProductsService: OrderProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const userId = createOrderDto.userId;
    const address = createOrderDto.address;
    const user = await this.userRepository.findOne(userId);

    const order = this.orderRepository.create({ user, address });
    const { id: orderId } = await this.orderRepository.save(order);

    const items = createOrderDto.items;
    await this.orderProductsService.add({
      orderId,
      items,
    });
    const res = await this.orderRepository.save(order);
    res.user = undefined;
    return res;
  }

  async findAll(userId?: number, completed?: boolean) {
    let orders = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderProducts', 'orderProducts')
      .leftJoinAndSelect('orderProducts.product', 'product')
      .leftJoinAndSelect('order.user', 'user');
    if (userId) {
      orders = orders.where('user.id = :userId', { userId });
    }
    if (completed !== undefined) {
      orders = orders.andWhere('order.completed = :completed', { completed });
    }
    return orders.getMany();
  }

  async findAndCount({
    start,
    length,
    search,
    order,
  }: LoadTableParams = {}): Promise<[Order[], number]> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderProducts', 'orderProducts')
      .leftJoinAndSelect('orderProducts.product', 'product');

    if (search) {
      console.log(search);

      queryBuilder
        .where(`order.address ILIKE '%${search}%'`)
        .orWhere(`user.telephoneNumber ILIKE '%${search}%'`);
    }
    if (!isNaN(parseInt(search))) {
      queryBuilder.orWhere(`order.id = ${parseInt(search)}`);
    }

    if (order) {
      Object.entries(order).forEach(([column, order]) => {
        const parsedColumnName =
          column.split('.'); /* разбить строку по нахождению . на  элементы*/

        if (parsedColumnName.length === 1) {
          parsedColumnName.unshift('order');
        }

        console.log(parsedColumnName);
        queryBuilder.orderBy(parsedColumnName.join('.'), order);
      });
    }

    return queryBuilder.take(length).skip(start).getManyAndCount();
  }

  async count(): Promise<number> {
    return this.orderRepository.count();
  }

  async setCompleted(id: number) {
    return this.orderRepository.update(id, { completed: true });
  }
}
