import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose, ObjectId } from "mongoose";
import { Size } from "./size.schema";


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
    
/*     @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
    idManufact: ObjectId;

    @Prop()
    idCategory: ObjectId; */
}

export const ProductSchema = SchemaFactory.createForClass(Product);