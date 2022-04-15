import { IsString, IsNumber} from "class-validator";

export class CreateCategoryDto {  
    @IsString()
    name: string;
    @IsNumber()
    parentCategory: number;
    showInHeader: boolean;
    showInFooter: boolean;
}
