import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { SYNC_STATUS_OPTIONS } from 'src/constants/sync-status-options';
import {
  HEYBEN_FIELD_UNIVERSAL_IDENTIFIERS,
  HEYBEN_SELECT_OPTION_UNIVERSAL_IDENTIFIERS,
} from 'src/constants/universal-identifiers';
import { buildSelectOptions } from 'src/utils/build-select-options';

export default defineField({
  universalIdentifier:
    HEYBEN_FIELD_UNIVERSAL_IDENTIFIERS.person.heybenSyncStatus,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.SELECT,
  name: 'heybenSyncStatus',
  label: 'HeyBen Sync Status',
  description: 'Outcome of the latest send to HeyBen / HeyOffice.',
  icon: 'IconCloudUpload',
  isNullable: true,
  options: buildSelectOptions({
    meta: [...SYNC_STATUS_OPTIONS],
    ids: HEYBEN_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.syncStatus,
  }),
});
