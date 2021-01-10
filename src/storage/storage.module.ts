import { Module } from '@nestjs/common';
import { StorageFactoryService } from './storage-factory.service';
import { S3StorageService } from './s3-storage/s3-storage.service';
import { FsStorageService } from './fs-storage/fs-storage.service';
import { FsStorageModule } from './fs-storage/fs-storage.module';
import { S3StorageModule } from './s3-storage/s3-storage.module';
import { AbstractStorage } from './abstract-storage';

@Module({
  providers: [
    StorageFactoryService,
    S3StorageService,
    FsStorageService,
    AbstractStorage,
  ],
  imports: [FsStorageModule, S3StorageModule],
  exports: [AbstractStorage],
})
export class StorageModule {}
