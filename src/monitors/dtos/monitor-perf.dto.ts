import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { Link } from 'src/links/entities/links.entity';

@InputType()
export class MonitorPerfInput extends PickType(Link, ['name']) {}

@ObjectType()
export class MonitorPerfOuput {
  @Field((_) => Int)
  LOGICAL_READS: number;

  @Field((_) => Int)
  PHYSICAL_READS: number;

  @Field((_) => Int)
  CPU: number;

  @Field((_) => Int)
  ACTIVE_SESSIONS: number;

  @Field((_) => Int)
  LOCK_SESSIONS: number;

  @Field((_) => Int)
  EXECUTIONS: number;
}
