import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors();

  const port = process.env.SERVICE_PORT;
  await app.listen(port, () => console.log(`Listening on port ${port}`));
}

bootstrap().catch(console.error);
