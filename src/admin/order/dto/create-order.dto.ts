import { Type } from "class-transformer";
import { IsArray, IsNumber, IsNumberString, ValidateNested } from "class-validator";
import { Product } from "src/admin/product/entities/product.entity";

export class OrderItem {
    @IsNumberString()
    productId: number;
    @IsNumber()
    quantity: number;
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItem)
    items: OrderItem[]

    @IsNumber()
    userId: number;
}
