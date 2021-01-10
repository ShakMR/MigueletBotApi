import { Injectable } from '@nestjs/common';
import { ClientInterface } from '../client-interface';
import { ResolvedStrategy } from '../../types/resolved-strategy';
import { TelegramMessageDTO } from '../../quotes/quotesDTO/TelegramMessageDTO';

@Injectable()
export class TelegramClientService implements ClientInterface {
  resolveQuery(params: TelegramMessageDTO): ResolvedStrategy {
    const isRandom = params.text.startsWith('/random');
    if (isRandom) {
      return { strategy: 'random', words: [] };
    }
    return { strategy: 'tag', words: params.text.split(' ') };
  }

  sendAudio(url: string): void {}
}
