import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import { CreateUserDTO } from "@app/common";

@Injectable()
export class UsersRepository {
    protected readonly logger = new Logger(UsersRepository.name)
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

    async create(user:CreateUserDTO){
        return new this.userModel(user).save() 
    }
    async findAll(){
        return this.userModel.find().exec()
    }
    async findByEmail(email:string){
        return this.userModel.findOne({email}).exec()
    }

    async findById(id: string) {
        return this.userModel.findById(id).exec()
    }
}