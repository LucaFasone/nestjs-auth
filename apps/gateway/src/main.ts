import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from '@app/core/interceptor/logging.interceptor';
import { HttpFilter } from '@app/core/filters/http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  app.useGlobalFilters(new HttpFilter())
  app.useGlobalInterceptors(new LoggerInterceptor())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
