import { Module } from '@nestjs/common';
import { AudiosService } from './audios.service';

@Module({
  providers: [AudiosService],
})
export class AudiosModule {}
