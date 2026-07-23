export type ZohoContact = {
  id: string;
  First_Name?: string | null;
  Last_Name?: string | null;
  Full_Name?: string | null;
  Email?: string | null;
  Phone?: string | null;
  Mobile?: string | null;
  Title?: string | null;
  Account_Name?: { name?: string | null } | string | null;
};

export const getZohoAccessToken = async (): Promise<{
  accessToken: string;
  apiDomain: string;
}> => {
  const clientId = process.env.ZOHO_CLIENT_ID?.trim();
  const clientSecret = process.env.ZOHO_CLIENT_SECRET?.trim();
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN?.trim();
  const accountsUrl = (
    process.env.ZOHO_ACCOUNTS_URL?.trim() || 'https://accounts.zoho.com'
  ).replace(/\/$/, '');
  const apiDomain = (
    process.env.ZOHO_API_DOMAIN?.trim() || 'https://www.zohoapis.com'
  ).replace(/\/$/, '');

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Missing ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, or ZOHO_REFRESH_TOKEN',
    );
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  const response = await fetch(`${accountsUrl}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Zoho token refresh failed: ${response.status} ${text}`);
  }

  const json = (await response.json()) as {
    access_token?: string;
    api_domain?: string;
  };
  if (!json.access_token) {
    throw new Error('Zoho token response missing access_token');
  }

  return {
    accessToken: json.access_token,
    apiDomain: (json.api_domain || apiDomain).replace(/\/$/, ''),
  };
};

export const fetchZohoContacts = async ({
  accessToken,
  apiDomain,
  pageLimit = 200,
}: {
  accessToken: string;
  apiDomain: string;
  pageLimit?: number;
}): Promise<ZohoContact[]> => {
  const contacts: ZohoContact[] = [];
  let page = 1;
  let more = true;

  while (more && contacts.length < 2000) {
    const url = new URL(`${apiDomain}/crm/v2/Contacts`);
    url.searchParams.set('page', String(page));
    url.searchParams.set('per_page', String(Math.min(pageLimit, 200)));
    url.searchParams.set(
      'fields',
      'First_Name,Last_Name,Full_Name,Email,Phone,Mobile,Title,Account_Name',
    );

    const response = await fetch(url, {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Zoho Contacts API ${response.status}: ${text}`);
    }

    const json = (await response.json()) as {
      data?: ZohoContact[];
      info?: { more_records?: boolean };
    };

    const batch = Array.isArray(json.data) ? json.data : [];
    contacts.push(...batch);
    more = Boolean(json.info?.more_records);
    page += 1;
    if (batch.length === 0) break;
  }

  return contacts;
};
