import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createSuperAdmin } from './global/decorators/admin.yarat';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true
  }))
  const port = process.env.PORT || 5000;
  app.enableCors();
  await app.listen(port, async () => {
    console.log("🚀 Server is runnning");

    // Admin yaratish
    await createSuperAdmin();
    
  });
  

}
bootstrap();
