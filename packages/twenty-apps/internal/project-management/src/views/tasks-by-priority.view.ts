import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  ViewType,
  defineView,
} from 'twenty-sdk/define';

import { TASKS_BY_PRIORITY_VIEW_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { PROJECT_ON_TASK_FIELD_ID } from 'src/fields/project-on-task.field';
import { SPACE_ON_TASK_FIELD_ID } from 'src/fields/space-on-task.field';
import { TASK_PRIORITY_FIELD_ID } from 'src/fields/task-priority.field';
import { TASK_ASSIGNMENTS_ON_TASK_FIELD_ID } from 'src/objects/task-assignment.object';

const TASK_FIELDS = STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.fields;

/**
 * Triage board over the standard Task, grouped by the priority field this app
 * adds. Complements Twenty's built-in "By Status" board rather than replacing it.
 */
export default defineView({
  universalIdentifier: TASKS_BY_PRIORITY_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Tasks by Priority',
  icon: 'IconFlag',
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  type: ViewType.KANBAN,
  position: 3,
  mainGroupByFieldMetadataUniversalIdentifier: TASK_PRIORITY_FIELD_ID,
  groups: [
    {
      universalIdentifier: '1d84c5a7-9b32-4e70-86df-5a2b71c9e408',
      fieldValue: 'URGENT',
      position: 0,
      isVisible: true,
    },
    {
      universalIdentifier: '8e2f3b96-4d17-4a85-b1c0-73e9d54a6215',
      fieldValue: 'HIGH',
      position: 1,
      isVisible: true,
    },
    {
      universalIdentifier: '5c9d1e48-7a63-4b29-90fe-2d18b4a37c65',
      fieldValue: 'NORMAL',
      position: 2,
      isVisible: true,
    },
    {
      universalIdentifier: 'a06b8f27-3c54-4d91-87ab-6e2f905d1b73',
      fieldValue: 'LOW',
      position: 3,
      isVisible: true,
    },
  ],
  fields: [
    {
      universalIdentifier: '2f7a9d51-8e46-4c03-b95d-71ca38e6f204',
      fieldMetadataUniversalIdentifier: TASK_FIELDS.title.universalIdentifier,
      position: 0,
      isVisible: true,
    },
    {
      universalIdentifier: 'd51c8b34-6f92-4a70-83ed-15b7e2094c86',
      fieldMetadataUniversalIdentifier: PROJECT_ON_TASK_FIELD_ID,
      position: 1,
      isVisible: true,
    },
    {
      universalIdentifier: '2c7b9e41-6d38-4a05-91f7-40e825b3c096',
      fieldMetadataUniversalIdentifier: SPACE_ON_TASK_FIELD_ID,
      position: 2,
      isVisible: true,
    },
    {
      universalIdentifier: '93e6f2a8-4b71-4d58-a02c-8f15d63b7e49',
      fieldMetadataUniversalIdentifier: TASK_ASSIGNMENTS_ON_TASK_FIELD_ID,
      position: 3,
      isVisible: true,
    },
    {
      universalIdentifier: '6b0d7c95-2a38-4e61-95fb-4c93e178a520',
      fieldMetadataUniversalIdentifier: TASK_FIELDS.dueAt.universalIdentifier,
      position: 4,
      isVisible: true,
    },
    {
      universalIdentifier: 'f48a1e62-9d05-4b37-8c1a-2e76b950d431',
      fieldMetadataUniversalIdentifier: TASK_FIELDS.status.universalIdentifier,
      position: 5,
      isVisible: true,
    },
    {
      universalIdentifier: '0a9c4d78-5e13-4f86-b247-9d38c1a05e62',
      fieldMetadataUniversalIdentifier: TASK_PRIORITY_FIELD_ID,
      position: 6,
      isVisible: false,
    },
  ],
});
