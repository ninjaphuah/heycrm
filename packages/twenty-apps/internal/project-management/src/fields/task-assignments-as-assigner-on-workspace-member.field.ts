import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import {
  TASK_ASSIGNMENT_ASSIGNER_FIELD_ID,
  TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  TASK_ASSIGNMENTS_AS_ASSIGNER_ON_WORKSPACE_MEMBER_FIELD_ID,
} from 'src/objects/task-assignment.object';

/**
 * Inverse of taskAssignment.assigner — everything a person has handed out.
 * Kept separate from `taskAssignments` (what they were given) so a member record
 * page shows both directions.
 */
export default defineField({
  universalIdentifier: TASK_ASSIGNMENTS_AS_ASSIGNER_ON_WORKSPACE_MEMBER_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  type: FieldType.RELATION,
  name: 'assignedTaskAssignments',
  label: 'Assignments Given',
  icon: 'IconUserShare',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    TASK_ASSIGNMENT_ASSIGNER_FIELD_ID,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
