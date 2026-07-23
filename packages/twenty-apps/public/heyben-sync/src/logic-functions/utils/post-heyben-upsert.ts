export type HeyBenCrmContactPayload = {
  externalPersonId: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  company?: {
    externalCompanyId?: string;
    name: string;
    email?: string;
    phone?: string;
    domain?: string;
  };
};

export type HeyBenUpsertResultItem = {
  externalPersonId: string;
  success: boolean;
  heyofficeMemberId?: string;
  heyofficeCompanyId?: string;
  heybenBusinessEntityId?: string;
  heybenContactId?: string;
  leadConvertedId?: string;
  created: boolean;
  message?: string;
};

export const postHeyBenUpsert = async ({
  apiUrl,
  apiKey,
  companyId,
  contacts,
  convertProspectsToCustomers = true,
  syncToXero = false,
}: {
  apiUrl: string;
  apiKey: string;
  /** Optional when using a company-scoped API key. */
  companyId?: string;
  contacts: HeyBenCrmContactPayload[];
  convertProspectsToCustomers?: boolean;
  syncToXero?: boolean;
}): Promise<{ results: HeyBenUpsertResultItem[] }> => {
  const base = apiUrl.replace(/\/$/, '');
  const targets: Array<'heyoffice' | 'heyben' | 'xero'> = [
    'heyoffice',
    'heyben',
  ];
  if (syncToXero) targets.push('xero');

  const response = await fetch(`${base}/internal/crm/contacts/upsert`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-internal-api-key': apiKey,
    },
    body: JSON.stringify({
      ...(companyId ? { companyId } : {}),
      targets,
      convertProspectsToCustomers,
      contacts,
    }),
  });


  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `HeyBen API ${response.status}: ${text || response.statusText}`,
    );
  }

  return (await response.json()) as { results: HeyBenUpsertResultItem[] };
};
