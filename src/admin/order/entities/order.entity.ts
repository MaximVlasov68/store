import { Product } from "src/admin/product/entities/product.entity";
import { Entity, ManyToMany, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'jsonb'})
    items: string;

}
