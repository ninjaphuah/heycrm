import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { SPACE_OBJECT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export const SPACE_ON_TASK_FIELD_ID = '0b7e3d95-8c14-4a26-9f50-1d68b2e7a034';
export const TASKS_ON_SPACE_FIELD_ID = 'e4a91c68-2f57-4d83-b016-93c7e5028d41';

/**
 * Task → Space, the direct parent in Project → Space → Task.
 *
 * The inverse `tasks` on Space is what makes "a space has all its tasks" true
 * without any extra machinery: open a space, see its task list.
 */
export default defineField({
  universalIdentifier: SPACE_ON_TASK_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  type: FieldType.RELATION,
  name: 'space',
  label: 'Space',
  icon: 'IconLayoutColumns',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    SPACE_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: TASKS_ON_SPACE_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'spaceId',
  },
});
