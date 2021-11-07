import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { MONITOR_TEST, PUB_SUB } from 'src/common/common.constants';
import { errLog } from 'src/common/hooks/errLog';
import { Link } from 'src/links/entities/links.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonitorsService {
  constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) {}
  async turnOn() {
    for (let step = 0; step < 1000; step++) {
      await new Promise((r) => setTimeout(r, 2000));
      await this.pubSub.publish(MONITOR_TEST, { monitorTest: { data: 1 } });
      console.log(1);
    }
  }
}
