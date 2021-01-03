import { Module } from '@nestjs/common';
import { StrategiesModule } from './strategies/strategies.module';
import { AudiosService } from './audios/audios.service';
import { AudiosModule } from './audios/audios.module';

@Module({
  imports: [StrategiesModule, AudiosModule],
  controllers: [],
  providers: [AudiosService],
})
export class AppModule {}
