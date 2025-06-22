import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/common/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/utils/jwt';


@Module({
  imports:[
    SequelizeModule.forFeature([User]),
    JwtModule.register(JwtAccesToken)
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
