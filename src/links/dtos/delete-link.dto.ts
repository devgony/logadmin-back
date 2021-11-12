import { InputType, ObjectType, OmitType, PickType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Link } from '../entities/links.entity';

@InputType()
export class DeleteLinkInput extends PickType(Link, ['name']) {}

@ObjectType()
export class DeleteLinkOutput extends ResultOutput {}
