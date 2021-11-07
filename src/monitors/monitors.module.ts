import { Module } from '@nestjs/common';
import { MonitorsResolver } from './monitors.resolver';
import { MonitorsService } from './monitors.service';

@Module({
  providers: [MonitorsResolver, MonitorsService]
})
export class MonitorsModule {}
