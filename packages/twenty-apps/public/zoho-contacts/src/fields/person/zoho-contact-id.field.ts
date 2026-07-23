import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { ZOHO_FIELD_UNIVERSAL_IDENTIFIERS } from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: ZOHO_FIELD_UNIVERSAL_IDENTIFIERS.person.zohoContactId,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.TEXT,
  name: 'zohoContactId',
  label: 'Zoho Contact Id',
  description: 'Zoho CRM Contact id from the latest import.',
  icon: 'IconId',
  isNullable: true,
});
