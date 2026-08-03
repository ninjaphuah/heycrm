import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  ALL_PROJECTS_NAV_UNIVERSAL_IDENTIFIER,
  ALL_PROJECTS_VIEW_UNIVERSAL_IDENTIFIER,
  PM_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: ALL_PROJECTS_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  icon: 'IconFolders',
  position: 1,
  folderUniversalIdentifier: PM_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: ALL_PROJECTS_VIEW_UNIVERSAL_IDENTIFIER,
});
