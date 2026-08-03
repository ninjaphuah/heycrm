import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PROJECT_OBJECT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import {
  PROJECTS_AS_OWNER_ON_WORKSPACE_MEMBER_FIELD_ID,
  PROJECT_OWNER_FIELD_ID,
} from 'src/objects/project.object';

/** Inverse of project.owner — the projects a person is accountable for. */
export default defineField({
  universalIdentifier: PROJECTS_AS_OWNER_ON_WORKSPACE_MEMBER_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember.universalIdentifier,
  type: FieldType.RELATION,
  name: 'ownedProjects',
  label: 'Owned Projects',
  icon: 'IconFolders',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: PROJECT_OWNER_FIELD_ID,
  universalSettings: { relationType: RelationType.ONE_TO_MANY },
});
