import { OrderProducts } from "src/admin/orderProducts/entities/orderProducts.entity";
import { Product } from "src/admin/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @OneToMany(() => OrderProducts, orderProducts => orderProducts.order)
    orderProducts: Product[];
}
