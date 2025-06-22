import { IsEmail, IsNotEmpty, Length } from "class-validator"


export class sendEmailAuthDto {

    @IsNotEmpty()
    @Length(3,35)
    @IsEmail()
    email:string


    @IsNotEmpty()
    matn:string


    @Length(2,160)
    @IsNotEmpty()
    description:string
}

