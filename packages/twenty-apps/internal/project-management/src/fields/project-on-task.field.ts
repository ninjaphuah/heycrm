import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PROJECT_OBJECT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export const PROJECT_ON_TASK_FIELD_ID = '0f633055-fce3-4105-a89e-67a6ee27013f';
export const TASKS_ON_PROJECT_FIELD_ID = '99149c67-e3b3-453e-a16d-9e17164581d2';

/**
 * Task → Project. The inverse `tasks` collection on Project is what makes a
 * project record page list its work.
 *
 * Deliberately MANY_TO_ONE (one project per task) rather than a taskTarget morph
 * relation: a task belongs to one project, and a real join column is what lets
 * views filter and group by project.
 */
export default defineField({
  universalIdentifier: PROJECT_ON_TASK_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  type: FieldType.RELATION,
  name: 'project',
  label: 'Project',
  icon: 'IconFolders',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: TASKS_ON_PROJECT_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    // Deleting a project must not delete the work done under it.
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'projectId',
  },
});
