import { Injectable } from '@nestjs/common';
import { ClientInterface } from '../client-interface';
import { ResolvedStrategy } from '../../types/resolved-strategy';

@Injectable()
export class TelegramClientService implements ClientInterface {
  resolveQuery(params: any): ResolvedStrategy | null {
    return { strategy: 'strategy', params };
  }

  sendAudio(url: string): void {}
}
