import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { HEYBEN_FIELD_UNIVERSAL_IDENTIFIERS } from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier:
    HEYBEN_FIELD_UNIVERSAL_IDENTIFIERS.person.heyofficeMemberId,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.TEXT,
  name: 'heyofficeMemberId',
  label: 'HeyOffice Member Id',
  description: 'SpMember.id created/updated in HeyOffice.',
  icon: 'IconId',
  isNullable: true,
});
