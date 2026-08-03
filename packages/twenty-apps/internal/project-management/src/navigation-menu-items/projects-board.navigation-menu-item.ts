import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  PM_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  PROJECTS_BOARD_NAV_UNIVERSAL_IDENTIFIER,
  PROJECTS_BOARD_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: PROJECTS_BOARD_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  icon: 'IconLayoutKanban',
  position: 0,
  folderUniversalIdentifier: PM_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: PROJECTS_BOARD_VIEW_UNIVERSAL_IDENTIFIER,
});
