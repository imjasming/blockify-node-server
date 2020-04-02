import { env } from 'process'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.APP_PORT || 8001);
}
bootstrap();
