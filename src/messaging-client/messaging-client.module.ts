import { Module } from '@nestjs/common';

import { MessagingClientFactory } from './messaging-client-factory.service';
import { TelegramClientService } from './telegram-client/telegram-client.service';

@Module({
  providers: [MessagingClientFactory, TelegramClientService],
  exports: [MessagingClientFactory],
})
export class MessagingClientModule {}
