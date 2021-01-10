import { Injectable, Logger } from '@nestjs/common';
import { TelegramClientService } from './telegram-client/telegram-client.service';
import { ClientInterface } from './client-interface';

const clientServices = {
  [TelegramClientService.name]: TelegramClientService,
};

@Injectable()
export class MessagingClientFactory {
  static clientNames = {
    telegram: TelegramClientService.name,
  };

  static create(name: string): ClientInterface {
    Logger.debug('SELECTED CLIENT', name);
    const selectedClient = MessagingClientFactory.clientNames[name];
    if (selectedClient) {
      return new clientServices[selectedClient]();
    }
    throw new Error('Client not found');
  }
}
