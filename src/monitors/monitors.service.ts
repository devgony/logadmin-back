import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errLog } from 'src/common/hooks/errLog';
import { Link } from 'src/links/entities/links.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonitorsService {
  // async connTest({
  //   name,
  //   host,
  //   port,
  //   username,
  //   password,
  //   database,
  // }: ConnTestInput): Promise<ConnTestOutput> {
  //   try {
  //     return;
  //   } catch (error) {
  //     errLog(__filename, error);
  //     return { ok: true, error: 'Connection faild' };
  //   }
  // }
}
