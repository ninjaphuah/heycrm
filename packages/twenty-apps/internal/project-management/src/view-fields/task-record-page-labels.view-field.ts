import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineViewField,
} from 'twenty-sdk/define';

import { TASK_LABELS_FIELD_ID } from 'src/fields/task-labels.field';

const TASK_RECORD_PAGE =
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.views.taskRecordPageFields;

/**
 * Surfaces `labels` on the task record page. Adding the field to the object is
 * not enough — the record page renders the standard taskRecordPageFields view,
 * so a field absent from that view is invisible and therefore uneditable.
 */
export default defineViewField({
  universalIdentifier: '78b3c1e6-9d47-4a80-b532-04e91d7ab265',
  viewUniversalIdentifier: TASK_RECORD_PAGE.universalIdentifier,
  fieldMetadataUniversalIdentifier: TASK_LABELS_FIELD_ID,
  viewFieldGroupUniversalIdentifier:
    TASK_RECORD_PAGE.viewFieldGroups.general.universalIdentifier,
  position: 24,
  isVisible: true,
});
