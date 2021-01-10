import { Injectable } from '@nestjs/common';
import { AbstractStorage } from '../abstract-storage';

@Injectable()
export class FsStorageService extends AbstractStorage {
  getFile(path: string): string {
    throw new Error('Method not implemented.');
  }
}
