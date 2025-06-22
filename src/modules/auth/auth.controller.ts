import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerAuthDto } from './dto/register.auth.dto';
import { loginAuthDto } from './dto/login.auth.dto';
import { sendEmailAuthDto } from './dto/send.email.dto';
import { AuthGuard } from 'src/global/guard/Auth.guard';
import { RolesGuard } from 'src/global/guard/Roles.guard';
import { Roles } from 'src/global/decorators/roles.decorator';
import { UserRole } from 'src/global/types/user.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() createAuthDto: registerAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post("login")
  login(@Body() createAuthDto: loginAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Get("activate/:token")
  activate_token(@Param("token") token:string){
    return this.authService.activate_token(token)

  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(UserRole.SuperAdmin)
  @Post("send/email")
  SendEmail(@Body() payload:sendEmailAuthDto){

    return this.authService.sendEmail(payload)
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(UserRole.SuperAdmin,UserRole.Admin)
  @Post("add/admin")
  addAdmin(@Body() payload:registerAuthDto){

    return this.authService.addAdmin(payload)
  }

}
