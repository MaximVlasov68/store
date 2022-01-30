import { Product } from "../../product/entities/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[]

    @ManyToOne(() => Category, child => child.id)
    parent: Category;
}