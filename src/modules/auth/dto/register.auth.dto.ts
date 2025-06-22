import { IsEmail, IsNotEmpty, Length } from "class-validator"


export class registerAuthDto {

    @IsNotEmpty()
    @Length(3,25)
    username:string

    @IsNotEmpty()
    @Length(8,16)
    password:string

    @Length(8,16)
    @IsNotEmpty()
    repeat_password:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    
}

