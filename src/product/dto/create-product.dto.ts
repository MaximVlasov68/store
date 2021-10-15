import { Category } from "src/category/schemas/category.schema";
import { Size } from "../schemas/size.schema";

export class CreateProductDto {
    
    productName: string;

    price: number;

    foto: string;

    color: string;

    weight: number;

    size: Size;

    numberOfStock: number;

    category: Category;
}
