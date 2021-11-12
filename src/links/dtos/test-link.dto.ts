import { InputType, ObjectType, OmitType, PickType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Link } from 'src/links/entities/links.entity';

@InputType()
export class TestLinkInput extends OmitType(Link, [
  'id',
  'created_at',
  'updated_at',
]) {}

@ObjectType()
export class TestLinkOuput extends ResultOutput {}
