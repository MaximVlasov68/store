import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Roles } from "../enums/roles";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    userId: number;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    role: Roles;

}

export const UserSchema = SchemaFactory.createForClass(User);

