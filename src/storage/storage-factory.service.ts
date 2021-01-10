import { Injectable, Logger } from '@nestjs/common';
import { S3StorageService } from './s3-storage/s3-storage.service';
import { FsStorageService } from './fs-storage/fs-storage.service';
import { AbstractStorage } from './abstract-storage';

const storageSystemMap = {
  [S3StorageService.name]: S3StorageService,
  [FsStorageService.name]: FsStorageService,
};

@Injectable()
export class StorageFactoryService {
  static storageNameMap = {
    S3: S3StorageService.name,
    FS: FsStorageService.name,
  };

  static create(name: string): AbstractStorage {
    Logger.debug('SELECTED storage', name);
    const selectedStorage = StorageFactoryService.storageNameMap[name];
    if (selectedStorage) {
      return new storageSystemMap[selectedStorage]();
    }
    throw new Error('Storage not found');
  }
}
