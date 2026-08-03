import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineObject,
} from 'twenty-sdk/define';

import {
  PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  SPACE_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export { SPACE_OBJECT_UNIVERSAL_IDENTIFIER };

export const SPACE_NAME_FIELD_ID = '5e8a0c72-3d41-4b96-87ef-2a15c0d94b63';
export const SPACE_DESCRIPTION_FIELD_ID =
  'f1c47b39-6e28-4d05-9a73-8b40e2517c94';
export const SPACE_STATUS_FIELD_ID = '2b9d5f81-4a07-4c63-b18e-70f3c9a2d516';
export const SPACE_POSITION_FIELD_ID = '8d3e6a14-7b52-4f90-a2c6-51b90e73d248';
export const SPACE_PROJECT_FIELD_ID = 'c7f2b508-6a94-4e13-b280-3d51f7a09e26';
export const SPACES_ON_PROJECT_FIELD_ID =
  '4a1c8e63-9d70-4b25-8f34-6e02b7d15c89';

/**
 * The middle tier of Project → Space → Task.
 *
 * A space is a lane of work inside a project ("Design", "Backend", "Q3 launch").
 * Tasks hang off the space, so a space record page lists all of its tasks
 * natively through the inverse relation.
 */
export default defineObject({
  universalIdentifier: SPACE_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'space',
  namePlural: 'spaces',
  labelSingular: 'Space',
  labelPlural: 'Spaces',
  description: 'A lane of work inside a project, holding tasks',
  icon: 'IconLayoutColumns',
  isSearchable: true,
  labelIdentifierFieldMetadataUniversalIdentifier: SPACE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: SPACE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Name',
      icon: 'IconAbc',
      defaultValue: "''",
    },
    {
      universalIdentifier: SPACE_DESCRIPTION_FIELD_ID,
      type: FieldType.TEXT,
      name: 'description',
      label: 'Description',
      icon: 'IconFileDescription',
      isNullable: true,
    },
    {
      universalIdentifier: SPACE_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'status',
      label: 'Status',
      icon: 'IconProgressCheck',
      defaultValue: "'ACTIVE'",
      options: [
        {
          id: '9b4e7c25-1a86-4d30-95f2-7c81e0a35d47',
          value: 'ACTIVE',
          label: 'Active',
          position: 0,
          color: 'blue',
        },
        {
          id: '3f8d1b60-5c93-4a27-8e14-2b60d9f74a15',
          value: 'ARCHIVED',
          label: 'Archived',
          position: 1,
          color: 'gray',
        },
      ],
    },
    {
      // Manual ordering of spaces within a project, ClickUp-style.
      universalIdentifier: SPACE_POSITION_FIELD_ID,
      type: FieldType.NUMBER,
      name: 'order',
      label: 'Order',
      icon: 'IconArrowsSort',
      isNullable: true,
    },
    {
      universalIdentifier: SPACE_PROJECT_FIELD_ID,
      type: FieldType.RELATION,
      name: 'project',
      label: 'Project',
      icon: 'IconFolders',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier:
        PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
      relationTargetFieldMetadataUniversalIdentifier:
        SPACES_ON_PROJECT_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        // Deleting a project must not delete the spaces (and therefore the work)
        // underneath it.
        onDelete: OnDeleteAction.SET_NULL,
        joinColumnName: 'projectId',
      },
    },
  ],
});
