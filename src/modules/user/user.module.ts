import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/common/models/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([User]),
  JwtModule.register({
    secret: "malina",
    signOptions: { expiresIn: '15m' },
  })
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
