import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { Product } from "src/admin/product/entities/product.entity";

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    items: {
        productId: number,
        quantity: number;
    }[]
}
