import { Post } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  @Query((_) => Boolean)
  test(): boolean {
    return true;
  }
}
