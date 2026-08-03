import { ViewType, defineView } from 'twenty-sdk/define';

import {
  ALL_PROJECTS_VIEW_UNIVERSAL_IDENTIFIER,
  PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { TASKS_ON_PROJECT_FIELD_ID } from 'src/fields/project-on-task.field';
import { SPACES_ON_PROJECT_FIELD_ID } from 'src/objects/space.object';
import {
  PROJECT_DUE_DATE_FIELD_ID,
  PROJECT_NAME_FIELD_ID,
  PROJECT_OWNER_FIELD_ID,
  PROJECT_PRIORITY_FIELD_ID,
  PROJECT_START_DATE_FIELD_ID,
  PROJECT_STATUS_FIELD_ID,
} from 'src/objects/project.object';

/**
 * Flat table of every project.
 *
 * "Date created" is not declared here: createdAt is a system field the engine
 * adds to every object, and for an app-defined object its universalIdentifier is
 * generated at sync time rather than being a constant we can import. It shows up
 * in the field picker on this view — toggle it on once and the choice persists.
 */
export default defineView({
  universalIdentifier: ALL_PROJECTS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'All Projects',
  icon: 'IconFolders',
  objectUniversalIdentifier: PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  position: 1,
  fields: [
    {
      universalIdentifier: '8b3f1d90-4c25-4a68-91de-3f7b0c6ea955',
      fieldMetadataUniversalIdentifier: PROJECT_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 240,
    },
    {
      universalIdentifier: '2e7c4a13-b69f-4d80-8c5a-1ab93e7dd066',
      fieldMetadataUniversalIdentifier: PROJECT_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '5d9e8f24-3a71-4b96-af2c-70d5148bc177',
      fieldMetadataUniversalIdentifier: PROJECT_PRIORITY_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '0c6b2a58-7e34-4f19-83bd-9f24e6a71288',
      fieldMetadataUniversalIdentifier: PROJECT_OWNER_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: 'a7f5c391-1d82-4e64-b09a-5c38f1d94399',
      fieldMetadataUniversalIdentifier: PROJECT_START_DATE_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: 'f2d9b846-6c07-4a35-9e1b-83a7c2504e10',
      fieldMetadataUniversalIdentifier: PROJECT_DUE_DATE_FIELD_ID,
      position: 5,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: 'b8027d64-3f19-4a75-9e02-51c74b3a6d80',
      fieldMetadataUniversalIdentifier: SPACES_ON_PROJECT_FIELD_ID,
      position: 6,
      isVisible: true,
      size: 200,
    },
    {
      universalIdentifier: '4b8e1c67-9a53-4d20-87fc-2e6d90b13a21',
      fieldMetadataUniversalIdentifier: TASKS_ON_PROJECT_FIELD_ID,
      position: 7,
      isVisible: true,
      size: 200,
    },
  ],
});
