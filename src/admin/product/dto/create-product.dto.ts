import { IsBoolean } from "class-validator";
import { Category } from "../../category/entities/category.entity";
import { Manufacturer } from "../../manufacturer/entities/manufacturer.entity";

export class CreateProductDto {
    productName: string;
    price: number;
    images: string[];
    color: string;
    weight: number;
    size: string;
    isAvailable: boolean;
    description: string;
    category: Category;
    manufacturer: Manufacturer
}
