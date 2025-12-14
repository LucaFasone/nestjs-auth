import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty({message:"Email is required"})
    @IsEmail({}, {message:"The email is not valid"})
    email:string

    @IsString()
    @IsNotEmpty({message:"Password is requried"})
    @MinLength(3,{message:"The password must have a lenght more than 3"})
    password:string

    @MinLength(3,{message:"The username must have a lenght more than 3"})
    username:string
}