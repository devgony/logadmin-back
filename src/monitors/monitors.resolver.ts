import { Inject } from '@nestjs/common';
import { Args, Int, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import {
  MONITOR_PERF,
  MONITOR_SESSIONS,
  PUB_SUB,
} from 'src/common/common.constants';
import { withCancel, withObservable } from 'src/common/hooks/with-observable';
import {
  activeSessionQ,
  perfQ,
  PROD_activeSessionQ,
} from 'src/common/queries/performance';
import {
  MonitorSessionsInput,
  MonitorSessionsOutput,
} from './dtos/monitor-sessions.dto';
import { MonitorPerfInput, MonitorPerfOuput } from './dtos/monitor-perf.dto';
import { MonitorsService } from './monitors.service';

@Resolver()
export class MonitorsResolver {
  constructor(
    private readonly monitorsService: MonitorsService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Subscription((_) => MonitorPerfOuput)
  async monitorPerf(@Args('input') monitorPerfInput: MonitorPerfInput) {
    const { interval, connection } = await this.monitorsService.startMonitor(
      MONITOR_PERF,
      monitorPerfInput,
      perfQ,
    );
    return withCancel(this.pubSub.asyncIterator(MONITOR_PERF), () => {
      console.log('cleared');
      clearInterval(interval);
      // connection.close();
    });
  }

  @Subscription((_) => MonitorSessionsOutput)
  async monitorSessions(
    @Args('input') monitorSessionsInput: MonitorSessionsInput,
  ) {
    const { interval, connection } = await this.monitorsService.startMonitor(
      'monitorSessions',
      monitorSessionsInput,
      // process.env.mode === 'prod' ? PROD_activeSessionQ : activeSessionQ,
      PROD_activeSessionQ,
    );
    return withCancel(this.pubSub.asyncIterator(MONITOR_SESSIONS), () => {
      clearInterval(interval);
      // connection.close();
    });
  }

  // @Query((_) => Int)
  // turnOn() {
  //   return this.monitorsService.turnOn();
  // }
}
