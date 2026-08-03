import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PROJECT_OBJECT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import {
  PROJECT_ON_TASK_FIELD_ID,
  TASKS_ON_PROJECT_FIELD_ID,
} from 'src/fields/project-on-task.field';

/** Inverse of project-on-task: the task list shown on a project record page. */
export default defineField({
  universalIdentifier: TASKS_ON_PROJECT_FIELD_ID,
  objectUniversalIdentifier: PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'tasks',
  label: 'Tasks',
  icon: 'IconCheckbox',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier: PROJECT_ON_TASK_FIELD_ID,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
