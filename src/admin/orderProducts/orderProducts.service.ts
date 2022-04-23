import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';
import { AddOrderItemsDto } from './dto/add-order-item.dto';
import { OrderProducts } from './entities/orderProducts.entity';

@Injectable()
export class OrderProductsService {
  constructor(
    @InjectRepository(OrderProducts)
    private orderProductsRepository: Repository<OrderProducts>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async add(addOrderItemsDto: AddOrderItemsDto) {
    const order = await this.orderRepository.findOne(addOrderItemsDto.orderId);
    await Promise.all(
      addOrderItemsDto.items.map(async ({ productId, quantity }) => {
        const product = await this.productRepository.findOne(productId);
        const orderProduct = await this.orderProductsRepository.create({
          order,
          product,
          quantity,
        });
        return this.orderProductsRepository.save(orderProduct);
      }),
    );
  }

  async findOne(id: number) {
    return this.orderProductsRepository.findOne(id);
  }
}
