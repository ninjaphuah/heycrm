import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import {
  PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  SPACE_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import {
  SPACES_ON_PROJECT_FIELD_ID,
  SPACE_PROJECT_FIELD_ID,
} from 'src/objects/space.object';

/** Inverse of space.project: the spaces that make up a project. */
export default defineField({
  universalIdentifier: SPACES_ON_PROJECT_FIELD_ID,
  objectUniversalIdentifier: PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'spaces',
  label: 'Spaces',
  icon: 'IconLayoutColumns',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    SPACE_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: SPACE_PROJECT_FIELD_ID,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
