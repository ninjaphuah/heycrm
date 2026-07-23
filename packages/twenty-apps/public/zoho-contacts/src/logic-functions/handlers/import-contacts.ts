import { CoreApiClient } from 'twenty-client-sdk/core';

import {
  fetchZohoContacts,
  getZohoAccessToken,
  type ZohoContact,
} from 'src/logic-functions/utils/zoho-api';

const accountName = (contact: ZohoContact): string | undefined => {
  const raw = contact.Account_Name;
  if (!raw) return undefined;
  if (typeof raw === 'string') return raw.trim() || undefined;
  return raw.name?.trim() || undefined;
};

const findPersonIdByEmail = async (
  client: CoreApiClient,
  email: string,
): Promise<string | null> => {
  const result = (await client.query({
    people: {
      __args: {
        filter: { emails: { primaryEmail: { eq: email } } },
        first: 1,
      },
      edges: { node: { id: true } },
    },
  })) as { people?: { edges?: { node: { id: string } }[] } };

  return result.people?.edges?.[0]?.node?.id ?? null;
};

const findOrCreateCompanyId = async (
  client: CoreApiClient,
  name: string,
): Promise<string | null> => {
  const existing = (await client.query({
    companies: {
      __args: {
        filter: { name: { eq: name } },
        first: 1,
      },
      edges: { node: { id: true } },
    },
  })) as { companies?: { edges?: { node: { id: string } }[] } };

  const found = existing.companies?.edges?.[0]?.node?.id;
  if (found) return found;

  const created = (await client.mutation({
    createCompany: {
      __args: { data: { name } },
      id: true,
    },
  })) as { createCompany?: { id?: string } };

  return created.createCompany?.id ?? null;
};

export const importZohoContactsCore = async ({
  client = new CoreApiClient(),
}: {
  client?: CoreApiClient;
} = {}) => {
  const { accessToken, apiDomain } = await getZohoAccessToken();
  const contacts = await fetchZohoContacts({ accessToken, apiDomain });

  let created = 0;
  let updated = 0;
  let skipped = 0;
  const now = new Date().toISOString();

  for (const contact of contacts) {
    const email = contact.Email?.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      skipped += 1;
      continue;
    }

    const firstName =
      contact.First_Name?.trim() ||
      contact.Full_Name?.trim()?.split(/\s+/)[0] ||
      'Contact';
    const lastName =
      contact.Last_Name?.trim() ||
      contact.Full_Name?.trim()?.split(/\s+/).slice(1).join(' ') ||
      undefined;
    const phone = contact.Phone?.trim() || contact.Mobile?.trim() || undefined;
    const company = accountName(contact);
    const companyId = company
      ? await findOrCreateCompanyId(client, company)
      : null;

    const existingId = await findPersonIdByEmail(client, email);
    const data: Record<string, unknown> = {
      name: { firstName, lastName: lastName ?? '' },
      emails: { primaryEmail: email },
      ...(phone
        ? { phones: { primaryPhoneNumber: phone, primaryPhoneCallingCode: '+852' } }
        : {}),
      ...(contact.Title?.trim() ? { jobTitle: contact.Title.trim() } : {}),
      ...(companyId ? { companyId } : {}),
      zohoContactId: contact.id,
      zohoImportedAt: now,
    };

    if (existingId) {
      await client.mutation({
        updatePerson: {
          __args: { id: existingId, data },
          id: true,
        },
      });
      updated += 1;
    } else {
      await client.mutation({
        createPerson: {
          __args: { data },
          id: true,
        },
      });
      created += 1;
    }
  }

  return {
    success: true,
    total: contacts.length,
    created,
    updated,
    skipped,
  };
};
