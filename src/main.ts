import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');
import { ResponseInterceptor } from './modules/shared/infrastructure/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookies
  app.use(cookieParser());

  // CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // Interceptor global
  app.useGlobalInterceptors(new ResponseInterceptor());

  // ---------------- Swagger ----------------
  const config = new DocumentBuilder()
    .setTitle('API de Alertas y Mascotas')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addBearerAuth() // JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Ruta: /api/docs
  // -----------------------------------------

  await app.listen(process.env.PORT ?? 3000);
  
}

bootstrap();
