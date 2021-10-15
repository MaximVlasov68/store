import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Category } from "src/category/schemas/category.schema";
import { Size } from "./size.schema";
import * as mongoose from 'mongoose';


export type ProductDocument = Product & Document;

@Schema()
export class Product {

    @Prop()
    productName: string;

    @Prop()
    price: number;

    @Prop()
    foto: string;

    @Prop()
    color: string;

    @Prop()
    weight: number;

    @Prop()
    size: Size;

    @Prop()
    numberOfStock: number;
    
/*    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
    idManufact: ObjectId; */

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);