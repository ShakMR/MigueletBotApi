import { Module } from '@nestjs/common';

@Module({
  exports: [FsStorageModule],
})
export class FsStorageModule {}
