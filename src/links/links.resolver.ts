import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LinksService } from './links.service';
import { CreateLinkInput, CreateLinkOutput } from './dtos/create-link.dto';
import { FindLinksOutput } from './dtos/find-links.dto';
import { TestLinkInput, TestLinkOuput } from './dtos/test-link.dto';
import { DeleteLinkInput, DeleteLinkOutput } from './dtos/delete-link.dto';

@Resolver()
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @Mutation(() => CreateLinkOutput)
  async createLink(
    @Args('input') createLinkInput: CreateLinkInput,
  ): Promise<CreateLinkOutput> {
    return this.linksService.createLink(createLinkInput);
  }

  @Mutation(() => DeleteLinkOutput)
  async deleteLink(
    @Args('input') deleteLinkInput: DeleteLinkInput,
  ): Promise<DeleteLinkOutput> {
    return this.linksService.deleteLink(deleteLinkInput);
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
