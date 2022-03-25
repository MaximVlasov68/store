import { Module } from '@nestjs/common';
import { OrderProductsService } from './orderProducts.service';
import { OrderProductController } from './orderProducts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProducts } from './entities/orderProducts.entity';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { Product } from '../product/entities/product.entity';
import { Order } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderProducts, Order, Product, User]),
    ProductModule,
    UsersModule,
  ],
  controllers: [OrderProductController],
  providers: [OrderProductsService, ProductService, OrderService],
  exports: [OrderProductsModule]
})
export class OrderProductsModule {}
