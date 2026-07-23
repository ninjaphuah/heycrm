import { defineApplication } from 'twenty-sdk/define';

import { APPLICATION_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: 'Zoho Contacts',
  description:
    'Import Zoho CRM Contacts into HeyCRM People (native OAuth refresh-token integration).',
  category: 'Productivity',
  author: 'HeyBen',
  serverVariables: {
    ZOHO_CLIENT_ID: {
      description: 'Zoho OAuth client id (Self Client / Server-based app)',
      isSecret: false,
      isRequired: true,
    },
    ZOHO_CLIENT_SECRET: {
      description: 'Zoho OAuth client secret',
      isSecret: true,
      isRequired: true,
    },
    ZOHO_REFRESH_TOKEN: {
      description:
        'Zoho OAuth refresh token with ZohoCRM.modules.contacts.READ (or ZohoCRM.modules.READ)',
      isSecret: true,
      isRequired: true,
    },
    ZOHO_ACCOUNTS_URL: {
      description:
        'Zoho accounts host — https://accounts.zoho.com | .eu | .in | .com.au | .com.cn',
      isSecret: false,
      isRequired: false,
    },
    ZOHO_API_DOMAIN: {
      description:
        'Zoho CRM API host — https://www.zohoapis.com | .eu | .in | .com.au | .com.cn',
      isSecret: false,
      isRequired: false,
    },
  },
});
