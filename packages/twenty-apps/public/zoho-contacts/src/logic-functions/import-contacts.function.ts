import { defineLogicFunction } from 'twenty-sdk/define';

import { ZOHO_LOGIC_FUNCTION_CONSTANTS } from 'src/constants/universal-identifiers';
import { importZohoContactsCore } from 'src/logic-functions/handlers/import-contacts';

export default defineLogicFunction({
  universalIdentifier:
    ZOHO_LOGIC_FUNCTION_CONSTANTS.importContacts.universalIdentifier,
  name: 'import-contacts',
  description: 'Import Zoho CRM Contacts into HeyCRM People',
  timeoutSeconds: 300,
  handler: () => importZohoContactsCore(),
  httpRouteTriggerSettings: {
    path: ZOHO_LOGIC_FUNCTION_CONSTANTS.importContacts.path,
    httpMethod: 'POST',
    isAuthRequired: true,
  },
  workflowActionTriggerSettings: {
    label: 'Import Zoho Contacts',
    icon: 'IconDownload',
    inputSchema: [],
    outputSchema: [
      {
        type: 'object',
        properties: {
          success: { type: 'boolean', label: 'Success' },
          total: { type: 'number', label: 'Total' },
          created: { type: 'number', label: 'Created' },
          updated: { type: 'number', label: 'Updated' },
          skipped: { type: 'number', label: 'Skipped' },
        },
      },
    ],
  },
});
