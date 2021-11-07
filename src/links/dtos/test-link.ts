import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Link } from 'src/links/entities/links.entity';

@InputType()
export class TestLinkInput extends PickType(Link, ['name']) {}

@ObjectType()
export class TestLinkOuput extends ResultOutput {}
