// src/modules/user/user.controller.ts

import {Controller,Get,Param,Put,Delete,Body,ParseIntPipe, Post, UseGuards, Req,} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/models/user.model';
import { registerAuthDto } from '../auth/dto/register.auth.dto';
import { AuthGuard } from 'src/global/guard/Auth.guard';
import { RolesGuard } from 'src/global/guard/Roles.guard';
import { Roles } from 'src/global/decorators/roles.decorator';
import { UserRole } from 'src/global/types/user.types';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(UserRole.SuperAdmin,UserRole.Admin)
  @Get("users")
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.SuperAdmin)
  @Get('user/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.SuperAdmin)
  @Put('user/update/:id')
  updateUser(@Param('id', ParseIntPipe) id: number,@Body() dto: Partial<User>,): Promise<User> {
    return this.userService.updateUser(id, dto);
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.SuperAdmin)
  @Delete('user/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.userService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Post('user/me')
  getMe(@Req() req) {
    return this.userService.getUserById2(req.user.id);
  }

}
