import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineViewField,
} from 'twenty-sdk/define';

import { TASK_STAGE_FIELD_ID } from 'src/fields/task-stage.field';

const TASK_RECORD_PAGE =
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.views.taskRecordPageFields;

/**
 * Surfaces `stage` on the task record page. Adding the field to the object is
 * not enough — the record page renders the standard taskRecordPageFields view,
 * so a field absent from that view is invisible and therefore uneditable.
 */
export default defineViewField({
  universalIdentifier: 'd61b48c9-3f75-4a02-95e8-40c7b12ea735',
  viewUniversalIdentifier: TASK_RECORD_PAGE.universalIdentifier,
  fieldMetadataUniversalIdentifier: TASK_STAGE_FIELD_ID,
  viewFieldGroupUniversalIdentifier:
    TASK_RECORD_PAGE.viewFieldGroups.general.universalIdentifier,
  position: 22,
  isVisible: true,
});
