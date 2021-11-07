import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Link } from '../entities/links.entity';

@InputType()
export class CreateLinkInput extends OmitType(Link, [
  'id',
  'created_at',
  'updated_at',
]) {}

@ObjectType()
export class CreateLinkOutput extends ResultOutput {}
