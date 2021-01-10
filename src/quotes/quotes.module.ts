import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { QuotesService } from './quotes.service';
import { MessagingClientFactory } from '../messaging-client/messaging-client-factory.service';

@Module({
  imports: [MessagingClientFactory, ConfigService],
  providers: [QuotesService],
})
export class QuotesModule {}
