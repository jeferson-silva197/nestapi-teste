import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environment } from './shared/common/enviropnment';
import { CustomLogger } from './shared/services/custom-logger.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: new CustomLogger(),
  });
  app.use(compression()); //Compressão de dados response mais rápida

  //Documentation
  const options = new DocumentBuilder()
    .setTitle('PetShop API')
    .setDescription('Api do curso 7180')
    .setVersion('1.0.0')
    .addTag('petshop')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(environment.server.port);
}
bootstrap();
