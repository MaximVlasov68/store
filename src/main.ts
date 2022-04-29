import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as handlebarsHelpers from 'handlebars-helpers';
import * as hbs from 'hbs';
import * as session from 'express-session';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as connectPg from 'connect-pg-simple';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
      forbidUnknownValues: true,
    }),
  );

  app.use(
    session({
      store: new (connectPg(session))({
        conObject: {
          host: process.env.POSTGRES_HOST,
          port: process.env.POSTGRES_PORT,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
        },
        createTableIfMissing: true,
      }),
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.handlebars.registerHelper({ ...handlebarsHelpers() });
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
