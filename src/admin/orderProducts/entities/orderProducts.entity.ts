import { Product } from "src/admin/product/entities/product.entity";
import { Order } from "src/admin/order/entities/order.entity";
import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class OrderProducts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, product => product.id)
    product: Product;
   
    @ManyToOne(() => Order, order => order.id)
    order: Order;
}
