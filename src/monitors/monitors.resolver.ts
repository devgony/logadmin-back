import { Args, Query, Resolver } from '@nestjs/graphql';
import { MonitorsService } from './monitors.service';

@Resolver()
export class MonitorsResolver {
  // constructor(private readonly monitorsService: MonitorsService) {}
  // @Query((_) => Boolean)
  // async connTest(
  //   @Args('input') connTestInput: ConnTestInput,
  // ): Promise<ConnTestOutput> {
  //   return this.monitorsService.connTest(connTestInput);
  // }
}
