import { defineFrontComponent } from 'twenty-sdk/define';
import { Command, enqueueSnackbar } from 'twenty-sdk/front-component';
import { RestApiClient } from 'twenty-client-sdk/rest';

import {
  ZOHO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS,
  ZOHO_LOGIC_FUNCTION_CONSTANTS,
} from 'src/constants/universal-identifiers';

const ImportContacts = () => (
  <Command
    execute={async () => {
      try {
        const client = new RestApiClient();
        const result = (await client.post(
          `/s${ZOHO_LOGIC_FUNCTION_CONSTANTS.importContacts.path}`,
          {},
        )) as {
          created?: number;
          updated?: number;
          skipped?: number;
          total?: number;
        };
        await enqueueSnackbar({
          message: `Zoho import done — created ${result.created ?? 0}, updated ${result.updated ?? 0}, skipped ${result.skipped ?? 0}`,
          variant: 'success',
        });
      } catch {
        await enqueueSnackbar({
          message: 'Zoho contacts import failed',
          variant: 'error',
        });
      }
    }}
  />
);

export default defineFrontComponent({
  universalIdentifier: ZOHO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS.importContacts,
  name: 'import-zoho-contacts-effect',
  description: 'Import Zoho CRM contacts into People',
  component: ImportContacts,
  isHeadless: true,
});
