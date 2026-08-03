import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  ViewType,
  defineView,
} from 'twenty-sdk/define';

import { TASKS_BOARD_VIEW_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { PROJECT_ON_TASK_FIELD_ID } from 'src/fields/project-on-task.field';
import { SPACE_ON_TASK_FIELD_ID } from 'src/fields/space-on-task.field';
import { TASK_LABELS_FIELD_ID } from 'src/fields/task-labels.field';
import { TASK_PRIORITY_FIELD_ID } from 'src/fields/task-priority.field';
import { TASK_STAGE_FIELD_ID } from 'src/fields/task-stage.field';
import { TASK_ASSIGNMENTS_ON_TASK_FIELD_ID } from 'src/objects/task-assignment.object';

const TASK_FIELDS = STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.fields;

/**
 * The main board: Findings → In Progress → In Review → Completed.
 *
 * Position 0 so it sits first in the Projects folder. Columns come from the
 * `stage` field's options, so editing that option set in Settings changes the
 * board — the groups listed here are just the initial column order and
 * visibility.
 */
export default defineView({
  universalIdentifier: TASKS_BOARD_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Task Board',
  icon: 'IconLayoutKanban',
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  type: ViewType.KANBAN,
  position: 0,
  mainGroupByFieldMetadataUniversalIdentifier: TASK_STAGE_FIELD_ID,
  groups: [
    {
      universalIdentifier: 'b74e0c23-9f18-4a56-82d7-31e069c5b48a',
      fieldValue: 'FINDINGS',
      position: 0,
      isVisible: true,
    },
    {
      universalIdentifier: '5c81d2f9-6047-4b18-93ce-2a8517d0b46f',
      fieldValue: 'IN_PROGRESS',
      position: 1,
      isVisible: true,
    },
    {
      universalIdentifier: '3a06e947-2c85-4b31-90fd-64b17e5c82d0',
      fieldValue: 'IN_REVIEW',
      position: 2,
      isVisible: true,
    },
    {
      universalIdentifier: 'f19b7c34-8d50-4e26-a173-05c92b6084e7',
      fieldValue: 'COMPLETED',
      position: 3,
      isVisible: true,
    },
  ],
  fields: [
    {
      universalIdentifier: '7d3c0b58-4e91-4a27-b60f-925ea38c1b70',
      fieldMetadataUniversalIdentifier: TASK_FIELDS.title.universalIdentifier,
      position: 0,
      isVisible: true,
    },
    {
      universalIdentifier: '0e57b8a3-1d64-4f29-8570-c3e91b46a052',
      fieldMetadataUniversalIdentifier: TASK_ASSIGNMENTS_ON_TASK_FIELD_ID,
      position: 1,
      isVisible: true,
    },
    {
      universalIdentifier: 'c8a41f06-7b39-4d52-92e8-16b70da384c5',
      fieldMetadataUniversalIdentifier: TASK_PRIORITY_FIELD_ID,
      position: 2,
      isVisible: true,
    },
    {
      universalIdentifier: '4b902e76-1c48-4f03-85ad-70e6c9b21df8',
      fieldMetadataUniversalIdentifier: TASK_LABELS_FIELD_ID,
      position: 3,
      isVisible: true,
    },
    {
      universalIdentifier: '96e2d417-8c05-4b63-a91f-27de5b108f43',
      fieldMetadataUniversalIdentifier: TASK_FIELDS.dueAt.universalIdentifier,
      position: 4,
      isVisible: true,
    },
    {
      universalIdentifier: '1f6b8c40-5a27-4e93-b018-42d95e60738b',
      fieldMetadataUniversalIdentifier: SPACE_ON_TASK_FIELD_ID,
      position: 5,
      isVisible: true,
    },
    {
      universalIdentifier: 'd307a9b5-6e14-4c82-90f3-58a71b2e0645',
      fieldMetadataUniversalIdentifier: PROJECT_ON_TASK_FIELD_ID,
      position: 6,
      isVisible: false,
    },
    {
      universalIdentifier: '8250c1e7-3b96-4a70-8d15-6f02e94b7c3a',
      fieldMetadataUniversalIdentifier: TASK_STAGE_FIELD_ID,
      position: 7,
      isVisible: false,
    },
  ],
});
