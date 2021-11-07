import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';

@ObjectType()
export class MonitorTestOuput {
  @Field((_) => Int)
  data: number;
}
