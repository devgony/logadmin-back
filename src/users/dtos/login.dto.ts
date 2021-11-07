import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { User } from '../entities/users.entity';

@InputType()
export class LoginInput extends PickType(User, ['user_id', 'password']) {}

@ObjectType()
export class LoginOutput extends ResultOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
