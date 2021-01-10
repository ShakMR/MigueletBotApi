import { Injectable } from '@nestjs/common';
import { AbstractStorage } from '../abstract-storage';

@Injectable()
export class S3StorageService extends AbstractStorage {
  readonly storageName: string = 'S3';

  getFile(path: string): string {
    throw new Error('Method not implemented.');
  }
}
