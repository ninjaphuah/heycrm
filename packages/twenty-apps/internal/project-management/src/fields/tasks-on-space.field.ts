import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { SPACE_OBJECT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import {
  SPACE_ON_TASK_FIELD_ID,
  TASKS_ON_SPACE_FIELD_ID,
} from 'src/fields/space-on-task.field';

/** Inverse of space-on-task: every task belonging to a space. */
export default defineField({
  universalIdentifier: TASKS_ON_SPACE_FIELD_ID,
  objectUniversalIdentifier: SPACE_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'tasks',
  label: 'Tasks',
  icon: 'IconCheckbox',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier: SPACE_ON_TASK_FIELD_ID,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
