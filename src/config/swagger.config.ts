import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
            .setTitle('NestJS API Boilerplate')
            .setDescription('API documentation for NestJS API Boilerplate')
            .setVersion('1.0')
            .addBearerAuth()
            .build();