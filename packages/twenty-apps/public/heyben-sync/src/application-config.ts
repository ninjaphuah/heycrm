import { defineApplication } from 'twenty-sdk/define';

import { APPLICATION_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: 'HeyBen Sync',
  description:
    'Send selected People from HeyCRM to a HeyBen company as customers (encrypted API key).',
  category: 'Productivity',
  author: 'HeyBen',
  serverVariables: {
    HEYBEN_API_URL: {
      description:
        'HeyBen API base URL (e.g. http://localhost:3333 or https://api.heyben.ai)',
      isSecret: false,
      isRequired: true,
    },
    HEYBEN_CRM_API_KEY: {
      description:
        'Company API key from HeyBen → Integrations → HeyCRM (encrypted at rest there; stored as a secret here)',
      isSecret: true,
      isRequired: true,
    },
    HEYBEN_COMPANY_ID: {
      description:
        'Optional fallback company id — only needed with the legacy shared CRM_INTERNAL_API_KEY. Company-scoped keys ignore this.',
      isSecret: false,
      isRequired: false,
    },
    HEYBEN_SYNC_TO_XERO: {
      description:
        'Set to "true" to also upsert contacts into the company\'s connected Xero org',
      isSecret: false,
      isRequired: false,
    },
  },
});

