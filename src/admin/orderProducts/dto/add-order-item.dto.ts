import { IsArray, IsNumber, ValidateNested } from 'class-validator';

export class AddOrderItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  items: {
    productId: number;
    quantity: number;
  }[];

  @IsNumber()
  orderId: number;
}
