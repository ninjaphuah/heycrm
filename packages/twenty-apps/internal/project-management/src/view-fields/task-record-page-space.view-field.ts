import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineViewField,
} from 'twenty-sdk/define';

import { SPACE_ON_TASK_FIELD_ID } from 'src/fields/space-on-task.field';

const TASK_RECORD_PAGE =
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.views.taskRecordPageFields;

/**
 * Surfaces `space` on the task record page. Adding the field to the object is
 * not enough — the record page renders the standard taskRecordPageFields view,
 * so a field absent from that view is invisible and therefore uneditable.
 */
export default defineViewField({
  universalIdentifier: '3c8e51a7-6b04-4d29-9f17-25be70a1c843',
  viewUniversalIdentifier: TASK_RECORD_PAGE.universalIdentifier,
  fieldMetadataUniversalIdentifier: SPACE_ON_TASK_FIELD_ID,
  viewFieldGroupUniversalIdentifier:
    TASK_RECORD_PAGE.viewFieldGroups.general.universalIdentifier,
  position: 20,
  isVisible: true,
});
