import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  SPACES_OBJECT_NAV_UNIVERSAL_IDENTIFIER,
  SPACE_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

/**
 * "Spaces" as a first-class sidebar entry, the way Companies and People appear —
 * not a saved view buried in a folder. Clicking it opens the space list, and each
 * space opens to its own task list.
 *
 * This is as close to ClickUp's sidebar as the nav metadata allows:
 * NavigationMenuItemType is VIEW | FOLDER | LINK | OBJECT | RECORD, and none of
 * them means "expand into the records of this object". A tree that auto-lists
 * every space by name is not declarable — see the note in the app README.
 */
export default defineNavigationMenuItem({
  universalIdentifier: SPACES_OBJECT_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.OBJECT,
  name: 'Spaces',
  icon: 'IconLayoutColumns',
  position: -3,
  targetObjectUniversalIdentifier: SPACE_OBJECT_UNIVERSAL_IDENTIFIER,
});
