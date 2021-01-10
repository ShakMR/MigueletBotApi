import { Injectable } from '@nestjs/common';
import { AbstractStrategy } from '../abstract-strategy';
import { AudioMapping } from '../../audios/audio-mapping';
import { AudioMeta } from '../../audios/audio-meta';

@Injectable()
export class TagStrategyService implements AbstractStrategy {
  run(mapping: AudioMapping, params: any[]): AudioMeta {
    return undefined;
  }
}
