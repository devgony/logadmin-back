import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { MONITOR_PERF, PUB_SUB } from 'src/common/common.constants';
import { errLog } from 'src/common/hooks/errLog';
import { perfQ } from 'src/common/queries/performance';
import { Link } from 'src/links/entities/links.entity';
import { createConnection, getConnectionManager, Repository } from 'typeorm';
import { MonitorPerfInput } from './dtos/monitor-perf.dto';

const TERM = 3 * 1000;

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
      const currentTime = new Date().toString().split(' ')[4];
      const data = { currentTime, ...result };
      this.pubSub.publish(subscriptionName, {
        [subscriptionName]: data,
      });
    }, TERM);
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
      const connectionManager = getConnectionManager();
      if (connectionManager.has(name)) {
        const connection = connectionManager.get(name);
        console.log('reuse');
        return Promise.resolve(
          connection.isConnected ? connection : connection.connect(),
        );
      }
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
      console.log('newConnection');
      return connection;
    } catch (error) {
      errLog(__filename, error);
    }
  }
}
