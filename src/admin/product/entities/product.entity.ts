import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { Manufacturer } from "../../manufacturer/entities/manufacturer.entity";
import { SchemaFactory } from "@nestjs/mongoose";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    price: number;

    @Column()
    foto: string;

    @Column()
    color: string;

    @Column()
    weight: number;

    @Column()
    size: string;

    @Column()
    numberOfStock: number;

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @ManyToOne(() => Manufacturer, manufacturer => manufacturer.products)
    manufacturer: Manufacturer;
}