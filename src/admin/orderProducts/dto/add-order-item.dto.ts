import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { Product } from "src/admin/product/entities/product.entity";

export class AddOrderItemsDto {
    @IsArray()
    @ValidateNested({each: true})
    items: {
        productId: number;
        quantity: number;
    }[]

    @IsNumber()
    orderId: number;
}
