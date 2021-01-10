import { HttpCode, Body, Query, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientDTO } from './quotesDTO/ClientDTO';

import { MessagingClientFactory } from '../messaging-client/messaging-client-factory.service';
import { AudiosService } from '../audios/audios.service';
import { Audio } from '../audios/audio';
import { AbstractStorage } from '../storage/abstract-storage';
import { StorageFactoryService } from '../storage/storage-factory.service';
import { AbstractStrategy } from '../strategies/abstract-strategy';
import { StrategiesFactoryService } from '../strategies/strategies-factory.service';
import { ResolvedStrategy } from '../types/resolved-strategy';

@Controller('quotes')
export class QuotesController {
  constructor(private configService: ConfigService) {
    this.configService = configService;
  }

  @Post('/')
  @HttpCode(200)
  processMessage(
    @Query('client') clientParam: string,
    @Body() body: ClientDTO,
  ): void {
    const client = MessagingClientFactory.create(clientParam);
    const resolvedQuery: ResolvedStrategy = client.resolveQuery(body);

    const storageType = this.configService.get<string>('storage.SOURCE_TYPE');
    const storage: AbstractStorage = StorageFactoryService.create(storageType);

    const strategy: AbstractStrategy = StrategiesFactoryService.create(
      resolvedQuery.strategy,
    );

    const audioService: AudiosService = new AudiosService(storage, strategy);
    const audio: Audio = audioService.get(resolvedQuery.words);

    client.sendAudio(audio.URI);
  }
}
