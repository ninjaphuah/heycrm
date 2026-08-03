import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  MY_ASSIGNMENTS_NAV_UNIVERSAL_IDENTIFIER,
  MY_ASSIGNMENTS_VIEW_UNIVERSAL_IDENTIFIER,
  PM_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: MY_ASSIGNMENTS_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  icon: 'IconUserCircle',
  position: 3,
  folderUniversalIdentifier: PM_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: MY_ASSIGNMENTS_VIEW_UNIVERSAL_IDENTIFIER,
});
