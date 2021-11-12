import { Product } from "src/admin/product/entities/product.entity";
import { Entity, ManyToMany, Column, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => OrderItem)
    items: OrderItem[];

}
