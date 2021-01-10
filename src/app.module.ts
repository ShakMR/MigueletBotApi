import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { QuotesController } from './quotes/quotes.controller';
import { QuotesModule } from './quotes/quotes.module';
import { MessagingClientModule } from './messaging-client/messaging-client.module';
import { StrategiesModule } from './strategies/strategies.module';
import { StorageModule } from './storage/storage.module';
import { AudiosModule } from './audios/audios.module';
import configuration from './config/index';

@Module({
  imports: [
    QuotesModule,
    MessagingClientModule,
    StrategiesModule,
    StorageModule,
    AudiosModule,
    ConfigModule.forRoot({
      load: [() => configuration],
    }),
  ],
  controllers: [QuotesController],
})
export class AppModule {}
