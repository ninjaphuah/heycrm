import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { HEYBEN_FIELD_UNIVERSAL_IDENTIFIERS } from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier:
    HEYBEN_FIELD_UNIVERSAL_IDENTIFIERS.person.heybenContactId,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.TEXT,
  name: 'heybenContactId',
  label: 'HeyBen Contact Id',
  description: 'Contact.id created/updated in HeyBen accounting.',
  icon: 'IconId',
  isNullable: true,
});
