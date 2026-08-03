import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineObject,
} from 'twenty-sdk/define';

import { PROJECT_OBJECT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export { PROJECT_OBJECT_UNIVERSAL_IDENTIFIER };

export const PROJECT_NAME_FIELD_ID = 'a0b8e17a-21c1-4dda-ac2c-e17a490768fc';
export const PROJECT_DESCRIPTION_FIELD_ID =
  '28e0283a-964d-44ba-bbfc-73afbb3c2db3';
export const PROJECT_STATUS_FIELD_ID = '7eb260ba-47a3-4030-b752-e5d44d9e58bd';
export const PROJECT_PRIORITY_FIELD_ID = '824c91c2-004d-4f9b-8f09-34a3630b00e3';
export const PROJECT_START_DATE_FIELD_ID =
  '86a3d532-8632-45b3-bc60-dddf2549b26d';
export const PROJECT_DUE_DATE_FIELD_ID = 'ae3eb25d-754e-4298-a30b-9d1557376f15';
export const PROJECT_OWNER_FIELD_ID = '96c50848-5bae-4f32-b770-0f9fd535d45c';

/** Inverse of PROJECT_OWNER_FIELD_ID, materialised on Workspace Member. */
export const PROJECTS_AS_OWNER_ON_WORKSPACE_MEMBER_FIELD_ID =
  'dbcc8425-cb91-4939-b313-94166f11c0d4';

/**
 * The container Twenty has no standard equivalent of: a body of work that owns
 * many Tasks. Tasks link back via `project` (see project-on-task.field.ts), so a
 * project record page lists its tasks and the standard Task kanban still works.
 */
export default defineObject({
  universalIdentifier: PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'project',
  namePlural: 'projects',
  labelSingular: 'Project',
  labelPlural: 'Projects',
  description: 'A body of work that groups tasks, with an owner and a deadline',
  icon: 'IconFolders',
  isSearchable: true,
  labelIdentifierFieldMetadataUniversalIdentifier: PROJECT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: PROJECT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Name',
      icon: 'IconAbc',
      defaultValue: "''",
    },
    {
      universalIdentifier: PROJECT_DESCRIPTION_FIELD_ID,
      type: FieldType.RICH_TEXT,
      name: 'description',
      label: 'Description',
      icon: 'IconFileDescription',
      isNullable: true,
    },
    {
      universalIdentifier: PROJECT_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'status',
      label: 'Status',
      icon: 'IconProgressCheck',
      defaultValue: "'PLANNED'",
      options: [
        {
          id: 'ea212679-08e8-4a60-9b89-cf2613079b50',
          value: 'PLANNED',
          label: 'Planned',
          position: 0,
          color: 'gray',
        },
        {
          id: '92802511-e0ce-4923-ab10-25a1e451941c',
          value: 'ACTIVE',
          label: 'Active',
          position: 1,
          color: 'blue',
        },
        {
          id: '04832f4b-14db-4ace-b595-6edcc838dd79',
          value: 'ON_HOLD',
          label: 'On hold',
          position: 2,
          color: 'orange',
        },
        {
          id: '28b34674-2c2c-40c1-a6a6-76e351af0619',
          value: 'DONE',
          label: 'Done',
          position: 3,
          color: 'green',
        },
        {
          id: 'd9736a66-5f0e-4c7f-9d00-5b06608d34c5',
          value: 'CANCELLED',
          label: 'Cancelled',
          position: 4,
          color: 'red',
        },
      ],
    },
    {
      universalIdentifier: PROJECT_PRIORITY_FIELD_ID,
      type: FieldType.SELECT,
      name: 'priority',
      label: 'Priority',
      icon: 'IconFlag',
      defaultValue: "'NORMAL'",
      options: [
        {
          id: '3789155f-ff4a-487c-aed6-0bd257e9019a',
          value: 'LOW',
          label: 'Low',
          position: 0,
          color: 'gray',
        },
        {
          id: 'b5448cdb-e4a2-471b-802d-dbaea48b2695',
          value: 'NORMAL',
          label: 'Normal',
          position: 1,
          color: 'blue',
        },
        {
          id: 'ce1915ad-bee8-431a-91d1-9a3be857f29e',
          value: 'HIGH',
          label: 'High',
          position: 2,
          color: 'orange',
        },
        {
          id: '0d6ff815-c9cd-4a9a-b49b-4c00ffeafea2',
          value: 'URGENT',
          label: 'Urgent',
          position: 3,
          color: 'red',
        },
      ],
    },
    {
      universalIdentifier: PROJECT_START_DATE_FIELD_ID,
      type: FieldType.DATE,
      name: 'startDate',
      label: 'Start date',
      icon: 'IconCalendarPlus',
      isNullable: true,
    },
    {
      universalIdentifier: PROJECT_DUE_DATE_FIELD_ID,
      type: FieldType.DATE,
      name: 'dueDate',
      label: 'Due date',
      icon: 'IconCalendarDue',
      isNullable: true,
    },
    {
      universalIdentifier: PROJECT_OWNER_FIELD_ID,
      type: FieldType.RELATION,
      name: 'owner',
      label: 'Owner',
      icon: 'IconUserCircle',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember
          .universalIdentifier,
      relationTargetFieldMetadataUniversalIdentifier:
        PROJECTS_AS_OWNER_ON_WORKSPACE_MEMBER_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.SET_NULL,
        joinColumnName: 'ownerId',
      },
    },
  ],
});
