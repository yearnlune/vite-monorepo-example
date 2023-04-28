import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function createSwaggerDocument(app: INestApplication) {
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('vite-monorepo-backend')
      .setDescription('vite-monorepo-backend API')
      .build()
  );

  SwaggerModule.setup('/_/swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createSwaggerDocument(app);
  return app;
}

async function main() {
  const app = await bootstrap();
  await app.listen(parseInt(process.env.HTTP_PORT ?? '8080'));
}

export const viteNodeApp =
  process.env.NODE_ENV !== 'development'
    ? main().catch((e) => {
        console.error(e);
        process.exit(1);
      })
    : bootstrap();
