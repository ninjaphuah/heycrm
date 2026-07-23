import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { ZOHO_FIELD_UNIVERSAL_IDENTIFIERS } from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: ZOHO_FIELD_UNIVERSAL_IDENTIFIERS.person.zohoImportedAt,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.DATE_TIME,
  name: 'zohoImportedAt',
  label: 'Zoho Imported At',
  description: 'When this person was last imported from Zoho CRM.',
  icon: 'IconClock',
  isNullable: true,
});
