import { Module } from "@nestjs/common";
import { CategoryModule } from "./category/category.module";
import { ManufacturerModule } from "./manufacturer/manufacturer.module";
import { ProductModule } from "./product/product.module";
import { AdminController } from "./admin.controller";

@Module({
    imports: [CategoryModule, ProductModule, ManufacturerModule],
    exports: [CategoryModule, ProductModule, ManufacturerModule],
    controllers: [AdminController]
})
export class AdminModule {}