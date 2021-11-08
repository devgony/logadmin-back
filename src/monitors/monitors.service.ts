import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { MONITOR_PERF, PUB_SUB } from 'src/common/common.constants';
import { errLog } from 'src/common/hooks/errLog';
import { perfQ } from 'src/common/queries/performance';
import { Link } from 'src/links/entities/links.entity';
import { createConnection, Repository } from 'typeorm';
import { MonitorPerfInput } from './dtos/monitor-perf.dto';

@Injectable()
export class MonitorsService {
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    @InjectRepository(Link) private readonly links: Repository<Link>,
  ) {}

  async startMonitor(
    subscriptionName: string,
    { name }: MonitorPerfInput,
    query: string,
  ) {
    const connection = await this.openConnection({ name });
    const interval = setInterval(async () => {
      const [result] = await connection.query(query);
      console.log(result);
      this.pubSub.publish(subscriptionName, {
        [subscriptionName]: result,
      });
    }, 3000);
    return { interval, connection };
  }

  async openConnection({ name }: MonitorPerfInput) {
    try {
      const { host, port, database, connectString, username, password } =
        await this.links.findOne({ where: { name } });
      if (!host) {
        new Error('Could not find link');
      }
      // do sth
      const connection = await createConnection({
        type: 'oracle',
        name,
        // host,
        // port,
        // database,
        connectString,
        username,
        password,
      });
      return connection;
    } catch (error) {
      errLog(__filename, error);
    }
  }
}
