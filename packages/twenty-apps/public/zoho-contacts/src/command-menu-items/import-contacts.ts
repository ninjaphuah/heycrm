import {
  defineCommandMenuItem,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import {
  ZOHO_COMMAND_MENU_ITEM_UNIVERSAL_IDENTIFIERS,
  ZOHO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS,
} from 'src/constants/universal-identifiers';

export default defineCommandMenuItem({
  universalIdentifier:
    ZOHO_COMMAND_MENU_ITEM_UNIVERSAL_IDENTIFIERS.importContacts,
  availabilityObjectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  frontComponentUniversalIdentifier:
    ZOHO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS.importContacts,
  label: 'Import Zoho Contacts',
  availabilityType: 'GLOBAL',
});
