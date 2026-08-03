import { ViewType, defineView } from 'twenty-sdk/define';

import {
  ALL_SPACES_VIEW_UNIVERSAL_IDENTIFIER,
  SPACE_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { TASKS_ON_SPACE_FIELD_ID } from 'src/fields/space-on-task.field';
import {
  SPACE_NAME_FIELD_ID,
  SPACE_POSITION_FIELD_ID,
  SPACE_PROJECT_FIELD_ID,
  SPACE_STATUS_FIELD_ID,
} from 'src/objects/space.object';

/** Spaces across all projects, with their task counts. */
export default defineView({
  universalIdentifier: ALL_SPACES_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'All Spaces',
  icon: 'IconLayoutColumns',
  objectUniversalIdentifier: SPACE_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  position: 2,
  fields: [
    {
      universalIdentifier: '7b2e9c04-5a31-4d68-8f92-0c47e1a63b58',
      fieldMetadataUniversalIdentifier: SPACE_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '3d8f1a76-9e52-4c07-b641-28a95d0374e1',
      fieldMetadataUniversalIdentifier: SPACE_PROJECT_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 200,
    },
    {
      universalIdentifier: 'c95a2b48-1d70-4e36-92f8-6b03e74a1d92',
      fieldMetadataUniversalIdentifier: SPACE_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '0e6d4f13-8b27-4a95-8c30-71d5920ea486',
      fieldMetadataUniversalIdentifier: TASKS_ON_SPACE_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: 'a41c7e59-3b86-4d02-91ac-58e70d243f61',
      fieldMetadataUniversalIdentifier: SPACE_POSITION_FIELD_ID,
      position: 4,
      isVisible: false,
      size: 90,
    },
  ],
});
