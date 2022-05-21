import { IsNumber, IsOptional } from 'class-validator';

export class LoadProductsDto {
  @IsOptional()
  @IsNumber()
  count?: number;
  @IsOptional()
  @IsNumber()
  page?: number;
}
