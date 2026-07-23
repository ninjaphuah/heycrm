import {
  defineCommandMenuItem,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import {
  HEYBEN_COMMAND_MENU_ITEM_UNIVERSAL_IDENTIFIERS,
  HEYBEN_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS,
} from 'src/constants/universal-identifiers';

export default defineCommandMenuItem({
  universalIdentifier:
    HEYBEN_COMMAND_MENU_ITEM_UNIVERSAL_IDENTIFIERS.sendPeople,
  availabilityObjectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  frontComponentUniversalIdentifier:
    HEYBEN_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS.sendPeople,
  label: 'Convert to HeyBen customers',
  availabilityType: 'RECORD_SELECTION',
});

