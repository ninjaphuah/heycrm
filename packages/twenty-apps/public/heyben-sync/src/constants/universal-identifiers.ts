export const APPLICATION_UNIVERSAL_IDENTIFIER =
  'bd0900af-ea86-44fd-82ad-d696d69ea19e';

export const DEFAULT_ROLE_UNIVERSAL_IDENTIFIER =
  'a1ae7b75-5a7f-4c8b-a81b-8f6ab951097d';

export const HEYBEN_LOGIC_FUNCTION_CONSTANTS = {
  sendPeople: {
    universalIdentifier: '5d27edbf-439c-4c5c-aa12-22c4043d1b77',
    path: '/heyben-sync/send-people',
  },
  resolveTarget: {
    universalIdentifier: '3f6a3ed7-be19-48c9-8262-32b385c44f4b',
    path: '/heyben-sync/resolve-target',
  },
} as const;

export const HEYBEN_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS = {
  sendPeople: '8ce8cb6e-f00c-4bb2-a756-fcd1c523f880',
} as const;

export const HEYBEN_COMMAND_MENU_ITEM_UNIVERSAL_IDENTIFIERS = {
  sendPeople: 'abf7e448-03d9-40e8-bed8-0ce413dfed3e',
} as const;

export const HEYBEN_FIELD_UNIVERSAL_IDENTIFIERS = {
  person: {
    heybenSyncStatus: '3aeb33e3-3ba8-450e-bc05-4ee30604fabd',
    heyofficeMemberId: 'c4a02738-b19f-41f2-ae63-341f588a4675',
    heybenContactId: '2722dd2d-e076-4db3-b28c-0c8d92118170',
    heybenSyncedAt: '52f050ea-c616-46d7-b4a1-26d2ee3533e6',
  },
} as const;

export const HEYBEN_SELECT_OPTION_UNIVERSAL_IDENTIFIERS = {
  syncStatus: {
    PENDING: 'b434d8fa-c189-4caf-b3a9-3c38ef22fbc8',
    SYNCED: 'c68e7a10-8d8b-43d0-9572-c0cb0e489345',
    ERROR: '7840a827-0dfe-431f-b001-994df98a753f',
    SKIPPED: '1faacd73-a125-4975-81e8-ded4681747ff',
  },
} as const;
