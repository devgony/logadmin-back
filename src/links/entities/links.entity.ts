import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, Unique } from 'typeorm';

@InputType('LinkEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@Entity()
@Unique(['host', 'port', 'database'])
export class Link extends CoreEntity {
  @Field(() => String, { nullable: false })
  @Column({ unique: true, nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  host: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  port: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  database: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  username: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  password: string;
}
