import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineViewField,
} from 'twenty-sdk/define';

import { TASK_ASSIGNMENTS_ON_TASK_FIELD_ID } from 'src/objects/task-assignment.object';

const TASK_RECORD_PAGE =
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.views.taskRecordPageFields;

/**
 * Surfaces `assignments` on the task record page. Adding the field to the object is
 * not enough — the record page renders the standard taskRecordPageFields view,
 * so a field absent from that view is invisible and therefore uneditable.
 */
export default defineViewField({
  universalIdentifier: 'e2d95f80-4a17-4c63-b981-53fa7c206bd4',
  viewUniversalIdentifier: TASK_RECORD_PAGE.universalIdentifier,
  fieldMetadataUniversalIdentifier: TASK_ASSIGNMENTS_ON_TASK_FIELD_ID,
  viewFieldGroupUniversalIdentifier:
    TASK_RECORD_PAGE.viewFieldGroups.general.universalIdentifier,
  position: 25,
  isVisible: true,
});
