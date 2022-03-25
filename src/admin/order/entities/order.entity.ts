import { OrderProducts } from "src/admin/orderProducts/entities/orderProducts.entity";
import { Product } from "src/admin/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, AfterLoad } from "typeorm";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    totalCost: number

    /* @AfterLoad()
    getTotalCost() {
        this.totalCost = this.orderProducts.reduce((sum, product) => sum + product.cost, 0)
    } */

    @ManyToOne(() => User, user => user.orders)
    user: User;
    
    @OneToMany(() => OrderProducts, orderProducts => orderProducts.order)
    orderProducts: OrderProducts[];
}
