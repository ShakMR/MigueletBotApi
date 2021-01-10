import { Injectable, Logger } from '@nestjs/common';
import { AbstractStrategy } from './abstract-strategy';
import { TagStrategyService } from './tag-strategy/tag-strategy.service';
import { RandomStrategyService } from './random-strategy/random-strategy.service';

const strategyServices = {
  [TagStrategyService.name]: TagStrategyService,
  [RandomStrategyService.name]: RandomStrategyService,
};

@Injectable()
export class StrategiesFactoryService {
  static strategyNames = {
    tag: TagStrategyService.name,
    random: RandomStrategyService.name,
  };

  static create(name: string): AbstractStrategy {
    Logger.debug(name, 'Strategy Factory');
    const selectedStrategy = StrategiesFactoryService.strategyNames[name];
    if (selectedStrategy) {
      return new strategyServices[selectedStrategy]();
    }
    throw new Error('Strategy not found');
  }
}
