import { AudioMapping } from '../audios/audio-mapping';
import { AudioMeta } from '../audios/audio-meta';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AbstractStrategy {
  run(mapping: AudioMapping, params: any[]): AudioMeta {
    throw new Error('unimplemented');
  };
}
