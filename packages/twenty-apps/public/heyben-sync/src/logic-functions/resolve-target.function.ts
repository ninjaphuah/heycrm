import { defineLogicFunction } from 'twenty-sdk/define';

import { HEYBEN_LOGIC_FUNCTION_CONSTANTS } from 'src/constants/universal-identifiers';

const handler = async () => {
  const apiUrl = process.env.HEYBEN_API_URL?.trim()?.replace(/\/$/, '');
  const apiKey = process.env.HEYBEN_CRM_API_KEY?.trim();
  if (!apiUrl || !apiKey) {
    throw new Error(
      'Missing HEYBEN_API_URL or HEYBEN_CRM_API_KEY in HeyBen Sync app settings',
    );
  }

  const response = await fetch(`${apiUrl}/internal/crm/whoami`, {
    headers: { 'x-internal-api-key': apiKey },
  });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `HeyBen whoami ${response.status}: ${text || response.statusText}`,
    );
  }

  return (await response.json()) as {
    companyId: string;
    companyName: string;
    credentialId: string;
    keyPrefix: string;
  };
};

export default defineLogicFunction({
  universalIdentifier:
    HEYBEN_LOGIC_FUNCTION_CONSTANTS.resolveTarget.universalIdentifier,
  name: 'resolve-target',
  description: 'Resolve the HeyBen company bound to the configured CRM API key',
  timeoutSeconds: 30,
  handler,
  httpRouteTriggerSettings: {
    path: HEYBEN_LOGIC_FUNCTION_CONSTANTS.resolveTarget.path,
    httpMethod: 'POST',
    isAuthRequired: true,
  },
});
