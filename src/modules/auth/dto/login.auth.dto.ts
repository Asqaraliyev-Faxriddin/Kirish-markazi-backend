import { IsNotEmpty, Length } from 'class-validator';

export class loginAuthDto  {

    @IsNotEmpty()
    @Length(3,25)
    username:string

    @IsNotEmpty()
    @Length(8,16)
    password:string
}
