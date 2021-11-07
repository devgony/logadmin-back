import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksResolver } from './links.resolver';
import { LinksService } from './links.service';
import { Link } from './entities/links.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinksResolver, LinksService],
  exports: [LinksService],
})
export class LinksModule {}
