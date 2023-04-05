import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('FTI API')
    .setDescription('Made by @Tutilabs')
    .setVersion('1.0')
    .addTag('FTI')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme('v3');
  const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
    customSiteTitle: 'FTI API Documentation',
    customfavIcon: './assets/tutilabs.ico',
  };

  SwaggerModule.setup('api', app, document, options);

  await app.listen(process.env.API_PORT);
  Logger.log(`🚀 Listening on PORT ${process.env.API_PORT}`);
  Logger.log(
    `📄 Take a look at the docs http://localhost:${process.env.API_PORT}/api`,
  );
}
bootstrap();
