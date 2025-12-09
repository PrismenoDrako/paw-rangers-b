import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');
import { ResponseInterceptor } from './modules/shared/infrastructure/interceptors/response.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Necesario para leer cookies HttpOnly
  app.use(cookieParser());

  // Permitir frontend Angular + cookies
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true, // Permite enviar cookies
  });

  app.useGlobalInterceptors(new ResponseInterceptor());


  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
