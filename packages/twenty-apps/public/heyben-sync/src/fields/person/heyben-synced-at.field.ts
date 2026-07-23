import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { HEYBEN_FIELD_UNIVERSAL_IDENTIFIERS } from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier:
    HEYBEN_FIELD_UNIVERSAL_IDENTIFIERS.person.heybenSyncedAt,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.DATE_TIME,
  name: 'heybenSyncedAt',
  label: 'HeyBen Synced At',
  description: 'When this person was last sent to HeyBen / HeyOffice.',
  icon: 'IconClock',
  isNullable: true,
});
