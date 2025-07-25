import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendActivationLink(email: string, token: string) {
    const url = `https://kirish-markazi-backend.onrender.com/auth/activate/${token}`; 
    await this.mailerService.sendMail({
      to: email,
      subject: "Ro'yxatdan o'tishni tasdiqlang",
      template: 'index',
      context: { url },
    });
  }

  async sendUser(email: string,matn:string, description: string) {

    await this.mailerService.sendMail({
      to: email,
      subject: matn,
      template: 'main',
      context: { description:description },
    });
  }
}   
