import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import {
  ALL_SPACES_NAV_UNIVERSAL_IDENTIFIER,
  ALL_SPACES_VIEW_UNIVERSAL_IDENTIFIER,
  PM_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: ALL_SPACES_NAV_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  icon: 'IconLayoutColumns',
  position: 2,
  folderUniversalIdentifier: PM_FOLDER_NAV_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: ALL_SPACES_VIEW_UNIVERSAL_IDENTIFIER,
});
