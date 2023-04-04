import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.API_PORT);
  Logger.log(`🚀 Listening on PORT ${process.env.API_PORT}`);
  Logger.log(
    `📄 Take a look at the docs http://localhost:${process.env.API_PORT}/api`,
  );
}
bootstrap();
