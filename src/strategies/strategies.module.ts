import { Module } from '@nestjs/common';
import { StrategiesFactoryService } from './strategies-factory.service';
import { RandomStrategyService } from './random-strategy/random-strategy.service';
import { TagStrategyService } from './tag-strategy/tag-strategy.service';
import { AbstractStrategy } from './abstract-strategy';

@Module({
  providers: [
    StrategiesFactoryService,
    RandomStrategyService,
    TagStrategyService,
    AbstractStrategy,
  ],
  exports: [AbstractStrategy],
})
export class StrategiesModule {}
