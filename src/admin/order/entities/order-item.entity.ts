import { Product } from "src/admin/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class OrderItem {
    @ManyToOne(() => Product, {cascade: true})
    product: Product;

    @Column({type: 'int'})
    quantity: number;
}