// src/modules/user/user.service.ts

import { Body, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/common/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { JwtAccesToken, JwtRefreshToken } from 'src/common/utils/jwt';
import { generate_token_interface, UserRole } from 'src/global/types/user.types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}



  // 🔍 Barcha foydalanuvchilarni olish
  async getAllUsers(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  // 🔍 ID orqali bitta foydalanuvchini olish
  async getUserById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi!');
    return user;
  }

  // ✏️ Foydalanuvchini yangilash
  async updateUser(id: number, dto: any): Promise<User> {
    const user = await this.getUserById(id);
    await user.update(dto);
    return user;
  }

  // ❌ Foydalanuvchini o‘chirish
  async deleteUser(id: number): Promise<string> {
    const user = await this.getUserById(id);
    await user.destroy();
    return "Foydalanuvchi o'chirildi'";
  }


  async getUserById2(id: number) {
    return this.userModel.findByPk(id, {
      attributes: ['id', 'username', 'email', 'role']
    });

  }
}