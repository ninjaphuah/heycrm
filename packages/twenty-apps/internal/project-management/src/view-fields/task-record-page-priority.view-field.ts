import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineViewField,
} from 'twenty-sdk/define';

import { TASK_PRIORITY_FIELD_ID } from 'src/fields/task-priority.field';

const TASK_RECORD_PAGE =
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.views.taskRecordPageFields;

/**
 * Surfaces `priority` on the task record page. Adding the field to the object is
 * not enough — the record page renders the standard taskRecordPageFields view,
 * so a field absent from that view is invisible and therefore uneditable.
 */
export default defineViewField({
  universalIdentifier: '5f04e7b2-8c61-4d93-a17f-6b28950dc314',
  viewUniversalIdentifier: TASK_RECORD_PAGE.universalIdentifier,
  fieldMetadataUniversalIdentifier: TASK_PRIORITY_FIELD_ID,
  viewFieldGroupUniversalIdentifier:
    TASK_RECORD_PAGE.viewFieldGroups.general.universalIdentifier,
  position: 23,
  isVisible: true,
});
