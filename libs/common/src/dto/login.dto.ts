import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO {
    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: "The email is not valid" })
    email: string

    @IsString()
    @IsNotEmpty({ message: "Password is requried" })
    @MinLength(3, { message: "The password must have a lenght more than 3" })
    password: string

}