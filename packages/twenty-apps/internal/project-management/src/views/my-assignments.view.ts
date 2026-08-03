import { ViewFilterOperand, ViewType, defineView } from 'twenty-sdk/define';

import {
  MY_ASSIGNMENTS_VIEW_UNIVERSAL_IDENTIFIER,
  TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import {
  TASK_ASSIGNMENT_ASSIGNER_FIELD_ID,
  TASK_ASSIGNMENT_DUE_DATE_FIELD_ID,
  TASK_ASSIGNMENT_MEMBER_FIELD_ID,
  TASK_ASSIGNMENT_ROLE_FIELD_ID,
  TASK_ASSIGNMENT_STATUS_FIELD_ID,
  TASK_ASSIGNMENT_TASK_FIELD_ID,
} from 'src/objects/task-assignment.object';

/**
 * The gap the junction object opens up: Twenty's built-in "Assigned to Me"
 * filters on task.assigneeId, so it misses anyone who is a reviewer or
 * collaborator rather than the single owner. This view catches all of them.
 *
 * The filter value shape is the engine's current-member sentinel, matching
 * compute-standard-task-view-filters.util.ts.
 */
export default defineView({
  universalIdentifier: MY_ASSIGNMENTS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'My Assignments',
  icon: 'IconUserCircle',
  objectUniversalIdentifier: TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  position: 2,
  fields: [
    {
      universalIdentifier: '6a4d2f81-3e59-4b07-8c1a-90f7b25de413',
      fieldMetadataUniversalIdentifier: TASK_ASSIGNMENT_TASK_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: 'c18b7e35-5f92-4a46-b70d-2e81cd9a5241',
      fieldMetadataUniversalIdentifier: TASK_ASSIGNMENT_ROLE_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '0e5f9c72-8a31-4d68-95b2-71c4e0a83d56',
      fieldMetadataUniversalIdentifier: TASK_ASSIGNMENT_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: 'b3c7a8d4-1e60-4f92-85ab-4d09e2b7c358',
      fieldMetadataUniversalIdentifier: TASK_ASSIGNMENT_DUE_DATE_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '5a83f2c7-1e94-4d60-b273-8c05e91a4763',
      fieldMetadataUniversalIdentifier: TASK_ASSIGNMENT_ASSIGNER_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '7f2e4b19-6d83-4c50-a91e-38b5f7c02a64',
      fieldMetadataUniversalIdentifier: TASK_ASSIGNMENT_MEMBER_FIELD_ID,
      position: 5,
      isVisible: false,
      size: 180,
    },
  ],
  filters: [
    {
      universalIdentifier: 'e94a1d63-2b78-4f35-8067-5c1d93ea7b02',
      fieldMetadataUniversalIdentifier: TASK_ASSIGNMENT_MEMBER_FIELD_ID,
      operand: ViewFilterOperand.IS,
      value: JSON.stringify({
        isCurrentWorkspaceMemberSelected: true,
        selectedRecordIds: [],
      }),
    },
  ],
});
