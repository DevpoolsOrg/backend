import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { PostgresDBExceptionsFilter } from './common/filters/postgresDB-exptions.filter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 4000;
  const logger = new Logger();
  app.enableCors({
    origin: process.env.FRONT_URL,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.use(cookieParser());
  app.useGlobalFilters(new PostgresDBExceptionsFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get('Reflector')));
  


  await app.listen(port, ()=>{
    logger.log(`Server is running on http://localhost:${port}`);

  });



}
bootstrap();
