import { OrderProducts } from "src/admin/orderProducts/entities/orderProducts.entity";
import { Product } from "src/admin/product/entities/product.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => OrderProducts, orderProducts => orderProducts.order)
    products: Product[];
}
