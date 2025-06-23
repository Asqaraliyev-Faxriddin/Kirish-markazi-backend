import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './common/models/user.model';
import { MailerModule } from './common/models/mailer/mailer.module';

@Module({
  imports: [ 

    ConfigModule.forRoot({
      isGlobal:true
    }),

    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({

        dialect:"postgres",
        username:configService.get("DB_USERNAME"),
        database:configService.get("DB_NAME"),
        password:configService.get("DB_PASS"),
        host:configService.get("DB_HOST"),
        port:configService.get("DB_PORT"),
        autoLoadModels:true,
        synchronize:true,
        models:[User],


      }),
      
    }),
    UserModule,
    AuthModule,
    MailerModule

  ],
})
export class AppModule {}
