import { Inject } from '@nestjs/common';
import { Args, Int, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { MONITOR_TEST, PUB_SUB } from 'src/common/common.constants';
import { MonitorTestOuput } from './dtos/monitor-test.dto';
import { MonitorsService } from './monitors.service';

@Resolver()
export class MonitorsResolver {
  constructor(
    private readonly monitorsService: MonitorsService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Subscription((_) => MonitorTestOuput)
  monitorTest() {
    return this.pubSub.asyncIterator(MONITOR_TEST);
  }

  @Query((_) => Int)
  turnOn() {
    return this.monitorsService.turnOn();
  }
}
