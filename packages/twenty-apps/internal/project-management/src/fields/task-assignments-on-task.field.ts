import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import {
  TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  TASK_ASSIGNMENT_TASK_FIELD_ID,
  TASK_ASSIGNMENTS_ON_TASK_FIELD_ID,
} from 'src/objects/task-assignment.object';

/**
 * Inverse of taskAssignment.task — this is the multi-assignee list as it appears
 * on a task record page.
 */
export default defineField({
  universalIdentifier: TASK_ASSIGNMENTS_ON_TASK_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  type: FieldType.RELATION,
  name: 'assignments',
  label: 'Assignments',
  icon: 'IconUsers',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    TASK_ASSIGNMENT_TASK_FIELD_ID,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
