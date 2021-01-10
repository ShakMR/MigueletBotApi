import { Injectable } from '@nestjs/common';

import { AbstractStorage } from '../storage/abstract-storage';
import { AudioMapping } from './audio-mapping';
import { AudioMeta } from './audio-meta';
import { Audio } from './audio';
import { AbstractStrategy } from '../strategies/abstract-strategy';

@Injectable()
export class AudiosService {
  private _storage: AbstractStorage;
  private _mappingsFilename: string;

  constructor(
    storage: AbstractStorage,
    strategy: AbstractStrategy,
  ) {
    this._storage = storage;
  }

  private getMappings(): AudioMapping {
    // gets the mapping file from storage
    return null;
  }

  private getAudio(audio: AudioMeta): Audio {
    // gets a specific audio from storage
    return null;
  }

  get(params: any[]) {
    return new Audio();
  }
}
