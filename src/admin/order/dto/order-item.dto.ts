import { IsInt, IsNumber } from "class-validator";
import { Product } from "src/admin/product/entities/product.entity";

export class OrderItemDto {
    @IsNumber()
    product: Product;

    @IsNumber()
    quantity: number;
}