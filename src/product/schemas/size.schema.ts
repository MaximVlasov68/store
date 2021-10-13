import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Size {

    @Prop()
    x: number;

    @Prop()
    y: number;

    @Prop()
    z: number;

}

export const SizeSchema = SchemaFactory.createForClass(Size);