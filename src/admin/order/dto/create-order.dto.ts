import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';

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
  items: OrderItem[];

  @IsNumber()
  userId: number;

  @IsString()
  address: string;
}
