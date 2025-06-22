import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/common/models/user.model';
import { registerAuthDto } from './dto/register.auth.dto';
import { loginAuthDto } from './dto/login.auth.dto';
import { Op } from 'sequelize';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { JwtAccesToken, JwtRefreshToken } from 'src/common/utils/jwt';
import { MailerService } from 'src/common/models/mailer/mailer.service';
import { sendEmailAuthDto } from './dto/send.email.dto';
import { generate_token_interface, UserRole } from 'src/global/types/user.types';


@Injectable()
export class AuthService {
  
  constructor(@InjectModel(User) private userModel:typeof User,private jwtService:JwtService,private mailerService:MailerService){}
  
    async generate_token(payload:generate_token_interface,status:boolean = false){

      let accessToken = await this.jwtService.signAsync(payload)
      let refreshToken = await this.jwtService.signAsync(payload)

      if(status){
        return accessToken
      }

      return {
        accessToken,
        refreshToken
      }
    }



    async register(payload: Required<registerAuthDto>) {
  
        let user = await this.userModel.findOne({
          where:{
            [Op.or]:[
             {username: payload.username},
             {email:payload.email}
            ] 
           }
        })

       if(user) throw new ConflictException("This username or email already exists!!!")
       if(payload.repeat_password !== payload.password) throw new ConflictException("Incorrect Repeat Password")


       let hashPassword = await  bcrypt.hash(payload.password,10)

       const token = await this.jwtService.signAsync(
        {
          username: payload.username,
          email: payload.email,
          password: hashPassword,
        },
        { expiresIn: '10m' }
      );
    
      await this.mailerService.sendActivationLink(payload.email, token);
      return {
        message:"Emailni tasdiqlsh uchun link yuborildi."
      }
   }

   async login(payload: Required<loginAuthDto>) {
  
       let user = await this.userModel.findOne({
          where:{
    
           username: payload.username
         
          
        }
      } )

        if(!user) throw new ConflictException("Emailga o'tib tasdiqlashni bosing")

        let password_check = await bcrypt.compare(payload.password,user.dataValues.password) 

        if(!password_check) throw new ConflictException("incorrect password")

        let tokens = await this.generate_token({id:user.id,role:user.dataValues.role})

        return {
           tokens,
           data:user
           }
    
    }

    
  async activate_token(token: string) {
     try {
      const userData = await this.jwtService.verifyAsync(token);

      let user = await this.userModel.findOne({
        where:{
          [Op.or]:[
           {username: userData.username},
           {email:userData.email}
          ] 
         }
      })

      if(user) throw new ConflictException("This username or email already exists!!!")
      const newUser = await this.userModel.create({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });

      return { message: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi"};
    } catch (err) {
     throw new BadRequestException();
    }
  }

  async sendEmail(payload:Required<sendEmailAuthDto>){

    await this.mailerService.sendUser(payload.email,payload.matn,payload.description)
    return {
      message:"Xabar yuborildi!!!"
    }
  }

  async addAdmin(payload:Required<registerAuthDto>){

    
    let user = await this.userModel.findOne({
      where:{
        [Op.or]:[
         {username: payload.username},
         {email:payload.email}
        ] 
       }
    })

   if(user) throw new ConflictException("This username or email already exists!!!")
   if(payload.repeat_password !== payload.password) throw new ConflictException("Incorrect Repeat Password")
   

   let hashPassword = await  bcrypt.hash(payload.password,10)
   let createUser = await this.userModel.create({...payload,password:hashPassword,role:UserRole.Admin})

   let tokens = await this.generate_token({id:createUser.id,role:createUser.role})

   return {
      tokens,
      data:createUser
      }


  }

}
