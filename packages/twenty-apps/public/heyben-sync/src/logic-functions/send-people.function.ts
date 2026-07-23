import {
  defineLogicFunction,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { HEYBEN_LOGIC_FUNCTION_CONSTANTS } from 'src/constants/universal-identifiers';
import { sendPeopleCore } from 'src/logic-functions/handlers/send-people';

type SendPeopleInput = {
  recordIds?: string[];
  records?: Array<{ id?: string }>;
  convertProspectsToCustomers?: boolean;
};

const handler = (input: SendPeopleInput) => sendPeopleCore({ input });

export default defineLogicFunction({
  universalIdentifier:
    HEYBEN_LOGIC_FUNCTION_CONSTANTS.sendPeople.universalIdentifier,
  name: 'send-people',
  description:
    'Convert selected People to HeyBen/HeyOffice customers via HeyBen API',
  timeoutSeconds: 120,
  handler,
  httpRouteTriggerSettings: {
    path: HEYBEN_LOGIC_FUNCTION_CONSTANTS.sendPeople.path,
    httpMethod: 'POST',
    isAuthRequired: true,
  },
  workflowActionTriggerSettings: {
    label: 'Convert to HeyBen customers',
    icon: 'IconCloudUpload',
    inputSchema: [
      {
        type: 'object',
        properties: {
          records: {
            type: 'records',
            objectUniversalIdentifier:
              STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
            label: 'People',
          },
        },
      },
    ],
    outputSchema: [
      {
        type: 'object',
        properties: {
          success: { type: 'boolean', label: 'Success' },
          total: { type: 'number', label: 'Total' },
          synced: { type: 'number', label: 'Synced' },
          skipped: { type: 'number', label: 'Skipped' },
          errored: { type: 'number', label: 'Errored' },
        },
      },
    ],
  },
});
