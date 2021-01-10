import { Module } from '@nestjs/common';
import { AudiosService } from './audios.service';
import { StorageModule } from '../storage/storage.module';
import { StrategiesModule } from '../strategies/strategies.module';

@Module({
  imports: [StorageModule, StrategiesModule],
  providers: [AudiosService],
  exports: [AudiosService],
})
export class AudiosModule {}
