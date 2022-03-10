import { Module } from "@nestjs/common";
import { CategoryModule } from "./category/category.module";
import { ManufacturerModule } from "./manufacturer/manufacturer.module";
import { ProductModule } from "./product/product.module";
import { AdminController } from "./admin.controller";
import { OrderProductsModule } from "./orderProducts/orderProducts.module";
import { OrderModule } from "./order/order.module";

@Module({
    imports: [
        CategoryModule,
        ProductModule,
        ManufacturerModule,
        OrderModule,
        OrderProductsModule
    ],
    exports: [
        CategoryModule,
        ProductModule,
        ManufacturerModule,
        OrderModule,
        OrderProductsModule
    ],
    controllers: [AdminController]
})
export class AdminModule { }