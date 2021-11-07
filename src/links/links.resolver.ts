import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LinksService } from './links.service';
import { CreateLinkInput, CreateLinkOutput } from './dtos/create-link.dto';
import { FindLinksOutput } from './dtos/find-links.dto';
import { TestLinkInput, TestLinkOuput } from './dtos/test-link';

@Resolver()
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @Mutation(() => CreateLinkOutput)
  async createLink(
    @Args('input') createLinkInput: CreateLinkInput,
  ): Promise<CreateLinkOutput> {
    return this.linksService.createLink(createLinkInput);
  }

  @Query(() => FindLinksOutput)
  async findLinks(): Promise<FindLinksOutput> {
    return this.linksService.findLinks();
  }

  @Query(() => TestLinkOuput)
  async testLink(
    @Args('input') testLinkInput: TestLinkInput,
  ): Promise<TestLinkOuput> {
    return this.linksService.testLink(testLinkInput);
  }
}
