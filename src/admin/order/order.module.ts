import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { Product } from '../product/entities/product.entity';
import { OrderProductsModule } from '../orderProducts/orderProducts.module';
import { OrderProducts } from '../orderProducts/entities/orderProducts.entity';
import { OrderProductsService } from '../orderProducts/orderProducts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, OrderProducts]),
    ProductModule,
    OrderProductsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductService, OrderProductsService],
  exports: [OrderService, OrderModule],
})
export class OrderModule {}
