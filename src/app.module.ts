import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './admin/product/product.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './admin/category/entities/category.entity';
import { Manufacturer } from './admin/manufacturer/entities/manufacturer.entity';
import { Product } from './admin/product/entities/product.entity';
import { User } from './users/entities/user.entity';
import { RouterModule } from '@nestjs/core';
import { CategoryModule } from './admin/category/category.module';
import { ManufacturerModule } from './admin/manufacturer/manufacturer.module';
import { OrderModule } from './admin/order/order.module';
import { Order } from './admin/order/entities/order.entity';
import { OrderProductsModule } from './admin/orderProducts/orderProducts.module';
import { OrderProducts } from './admin/orderProducts/entities/orderProducts.entity';
import { config } from 'dotenv';

config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Product, Category, Manufacturer, User, Order, OrderProducts],
      synchronize: true,
      logging: 'all',
    }),
    AdminModule,
    ProductModule,
    CategoryModule,
    ManufacturerModule,
    OrderModule,
    OrderProductsModule,
    AuthModule,
    UsersModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
        children: [
          {
            path: 'product',
            module: ProductModule,
          },
          {
            path: 'category',
            module: CategoryModule,
          },
          {
            path: 'manufacturer',
            module: ManufacturerModule,
          },
          {
            path: 'order',
            module: OrderModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
