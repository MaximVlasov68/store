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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'store',
      entities: [Product, Category, Manufacturer, User, Order],
      synchronize: true,
      logging: 'all'
    }),
    AdminModule,
    ProductModule,
    CategoryModule,
    ManufacturerModule,
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
        ]
      },
    ]),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
