import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/index';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: config.server.LOGGING,
  });
  await app.listen(config.server.PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
