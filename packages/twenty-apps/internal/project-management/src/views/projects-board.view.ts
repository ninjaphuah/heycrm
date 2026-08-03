import { ViewType, defineView } from 'twenty-sdk/define';

import {
  PROJECTS_BOARD_VIEW_UNIVERSAL_IDENTIFIER,
  PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import {
  PROJECT_DUE_DATE_FIELD_ID,
  PROJECT_NAME_FIELD_ID,
  PROJECT_OWNER_FIELD_ID,
  PROJECT_PRIORITY_FIELD_ID,
  PROJECT_STATUS_FIELD_ID,
} from 'src/objects/project.object';

/** The ClickUp-style board: projects as cards, columns by status. */
export default defineView({
  universalIdentifier: PROJECTS_BOARD_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Projects Board',
  icon: 'IconLayoutKanban',
  objectUniversalIdentifier: PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.KANBAN,
  position: 0,
  mainGroupByFieldMetadataUniversalIdentifier: PROJECT_STATUS_FIELD_ID,
  groups: [
    {
      universalIdentifier: '9744f252-765c-41cf-b546-41fbba9f7287',
      fieldValue: 'PLANNED',
      position: 0,
      isVisible: true,
    },
    {
      universalIdentifier: '5b9c3842-1d08-4913-b3f0-fe81f4355f96',
      fieldValue: 'ACTIVE',
      position: 1,
      isVisible: true,
    },
    {
      universalIdentifier: '333f8771-3bad-449c-a73f-351679e88d8e',
      fieldValue: 'ON_HOLD',
      position: 2,
      isVisible: true,
    },
    {
      universalIdentifier: 'eca34455-d01b-4891-bbfa-0b442197e0c8',
      fieldValue: 'DONE',
      position: 3,
      isVisible: true,
    },
    {
      universalIdentifier: 'ac850e65-43e0-4f84-a5fe-8c850e5318a2',
      fieldValue: 'CANCELLED',
      position: 4,
      isVisible: true,
    },
  ],
  fields: [
    {
      universalIdentifier: 'b9678989-2ed8-41af-9db3-3627366ca84c',
      fieldMetadataUniversalIdentifier: PROJECT_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
    },
    {
      universalIdentifier: '3a1c9f4e-2b70-4a55-9f2c-6d1e8b40aa11',
      fieldMetadataUniversalIdentifier: PROJECT_PRIORITY_FIELD_ID,
      position: 1,
      isVisible: true,
    },
    {
      universalIdentifier: '7c2d5e18-9f34-4b62-8a07-15e9c3d7bb22',
      fieldMetadataUniversalIdentifier: PROJECT_OWNER_FIELD_ID,
      position: 2,
      isVisible: true,
    },
    {
      universalIdentifier: 'd4e8b072-6a19-4c83-95fb-2071ea59cc33',
      fieldMetadataUniversalIdentifier: PROJECT_DUE_DATE_FIELD_ID,
      position: 3,
      isVisible: true,
    },
    {
      universalIdentifier: '1f9a6c35-8d42-4e71-b3ac-9c48f5620d44',
      fieldMetadataUniversalIdentifier: PROJECT_STATUS_FIELD_ID,
      position: 4,
      isVisible: false,
    },
  ],
});
