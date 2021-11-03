import { Category } from "../../category/entities/category.entity";
import { Manufacturer } from "../../manufacturer/entities/manufacturer.entity";

export class CreateProductDto {
    
    productName: string;

    price: number;

    foto: string;

    color: string;

    weight: number;

    size: string;

    numberOfStock: number;

    category: Category;

    manufacturer: Manufacturer
}
