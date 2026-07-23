import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('GoogleContactsImportSuccess')
export class GoogleContactsImportSuccessDTO {
  @Field(() => Boolean)
  success: boolean;
}
