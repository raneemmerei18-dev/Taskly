import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Main entry point for the NestJS application
 * Bootstraps the application and starts the server on port 3001
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    process.env.CORS_ORIGIN || 'http://localhost:5173',
    'http://localhost:5174',
  ];

  // Enable CORS for frontend requests from localhost:5173
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  await app.listen(3001);
  console.log('🚀 Backend running on http://localhost:3001');
}

bootstrap();
