import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({versionKey:false})
export class User extends Document{
    @Prop({required:true,unique:true,toLocaleLowerCase:true})
    email:string

    @Prop({required:true})
    password:string

    @Prop({required:true})
    username:string
}

export const UserSchema = SchemaFactory.createForClass(User);
