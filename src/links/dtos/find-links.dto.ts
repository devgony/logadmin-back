import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Link } from '../entities/links.entity';

@ObjectType()
export class FindLinksOutput {
  @Field((_) => [Link])
  Links: Link[];
}
