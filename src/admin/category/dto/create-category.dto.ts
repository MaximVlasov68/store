import { IsString, IsNumber } from "class-validator";

export class CreateCategoryDto {  
    @IsString()
    name: string;
    @IsNumber()
    parent: number;
}
