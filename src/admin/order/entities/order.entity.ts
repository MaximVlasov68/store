import { OrderProducts } from "src/admin/orderProducts/entities/orderProducts.entity";
import { Product } from "src/admin/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, AfterLoad } from "typeorm";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    totalCost: number

    @AfterLoad()
    getTotalCost() {
        const cost = this.orderProducts?.reduce((sum, product) => sum + product.cost, 0);
        let discount = 0;
        if (cost >= 5000) {
            discount = 0.05;
        }
        if (cost >= 10000) {
            discount = 0.1;
        }
        this.totalCost = cost - cost * discount;
    }

    @Column({ default: null })
    address: string;

    @Column({ default: false })
    completed: boolean;

    @ManyToOne(() => User, user => user.orders)
    user: User;
    
    @OneToMany(() => OrderProducts, orderProducts => orderProducts.order)
    orderProducts: OrderProducts[];
}
