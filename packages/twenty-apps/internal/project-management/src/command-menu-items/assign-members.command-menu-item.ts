import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineCommandMenuItem,
} from 'twenty-sdk/define';

import {
  ASSIGN_MEMBERS_COMMAND_UNIVERSAL_IDENTIFIER,
  ASSIGN_MEMBERS_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

/**
 * Pinned so it sits in the task record action bar rather than being buried in
 * the command menu — the point is that assigning people is one click.
 *
 * RECORD_SELECTION means it is offered both on a single task record and on a
 * multi-row selection in any task view, which gives bulk assign for free.
 */
export default defineCommandMenuItem({
  universalIdentifier: ASSIGN_MEMBERS_COMMAND_UNIVERSAL_IDENTIFIER,
  label: 'Assign members',
  shortLabel: 'Assign',
  isPinned: true,
  availabilityType: 'RECORD_SELECTION',
  availabilityObjectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  frontComponentUniversalIdentifier:
    ASSIGN_MEMBERS_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
});
