import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import {
  TASK_ASSIGNMENT_MEMBER_FIELD_ID,
  TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  TASK_ASSIGNMENTS_ON_WORKSPACE_MEMBER_FIELD_ID,
} from 'src/objects/task-assignment.object';

/**
 * Inverse of taskAssignment.member — everything a given person is on, in any
 * role. This is what the "My Assignments" view filters on.
 */
export default defineField({
  universalIdentifier: TASK_ASSIGNMENTS_ON_WORKSPACE_MEMBER_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  type: FieldType.RELATION,
  name: 'taskAssignments',
  label: 'Task Assignments',
  icon: 'IconUsers',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    TASK_ASSIGNMENT_MEMBER_FIELD_ID,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
