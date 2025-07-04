import { Field, ObjectType, ID, InputType } from 'type-graphql';

@ObjectType()
export class Suggestion {
  @Field(() => ID)
  id!: number;

  @Field()
  term!: string;

  @Field()
  category!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@InputType()
export class SearchSuggestionsInput {
  @Field()
  query!: string;

  @Field({ defaultValue: 20 })
  limit?: number;
}

@ObjectType()
export class SearchSuggestionsResponse {
  @Field(() => [Suggestion])
  suggestions!: Suggestion[];

  @Field()
  total!: number;

  @Field()
  hasMore!: boolean;
} 