import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from 'src/links/entities/links.entity';
import { MonitorsResolver } from './monitors.resolver';
import { MonitorsService } from './monitors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [MonitorsResolver, MonitorsService],
})
export class MonitorsModule {}
