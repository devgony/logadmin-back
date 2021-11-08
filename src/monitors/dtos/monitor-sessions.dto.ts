import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { Link } from 'src/links/entities/links.entity';

@InputType()
export class MonitorSessionsInput extends PickType(Link, ['name']) {}

@ObjectType()
export class MonitorSessionsOuput {
  @Field((_) => String)
  ELAPSED_TIME: string;
  @Field((_) => String)
  SID: string;
  @Field((_) => String)
  SERIAL: string;
  @Field((_) => String)
  USERNAME: string;
  @Field((_) => String)
  MACHINE: string;
  @Field((_) => String)
  EVENT: string;
  @Field((_) => String)
  SQL_TEXT: string;
  @Field((_) => String)
  PREV_SQL_TEXT: string;
  @Field((_) => String)
  BLOCKING_SESSION: string;
  @Field((_) => String)
  PROGRAM: string;
  @Field((_) => String)
  MODULE: string;
  @Field((_) => String)
  ACTION: string;
  @Field((_) => String)
  LOGON_TIME: string;
  @Field((_) => String)
  PREV_EXEC_START: string;
  @Field((_) => String)
  SPID: string;
}
