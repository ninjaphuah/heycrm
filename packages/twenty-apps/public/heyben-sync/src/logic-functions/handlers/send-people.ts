import { CoreApiClient } from 'twenty-client-sdk/core';

import { postHeyBenUpsert } from 'src/logic-functions/utils/post-heyben-upsert';
import {
  readPeople,
  type PersonNode,
} from 'src/logic-functions/utils/read-people';

type SendPeopleInput = {
  recordIds?: string[];
  records?: Array<{ id?: string }>;
  convertProspectsToCustomers?: boolean;
};

const toRecordIds = (input: SendPeopleInput): string[] => {
  if (Array.isArray(input.recordIds) && input.recordIds.length > 0) {
    return input.recordIds.filter((id): id is string => typeof id === 'string');
  }
  if (Array.isArray(input.records)) {
    return input.records
      .map((record) => record?.id)
      .filter((id): id is string => typeof id === 'string');
  }
  return [];
};

const toContactPayload = (person: PersonNode) => {
  const email = person.emails?.primaryEmail?.trim().toLowerCase();
  const firstName = person.name?.firstName?.trim() || 'Contact';
  const lastName = person.name?.lastName?.trim() || undefined;
  if (!email) {
    return null;
  }

  const companyName = person.company?.name?.trim();
  const domain = person.company?.domainName?.primaryLinkUrl?.trim();

  return {
    externalPersonId: person.id,
    firstName,
    lastName,
    email,
    phone: person.phones?.primaryPhoneNumber?.trim() || undefined,
    jobTitle: person.jobTitle?.trim() || undefined,
    company: companyName
      ? {
          externalCompanyId: person.company?.id ?? undefined,
          name: companyName,
          domain: domain || undefined,
        }
      : undefined,
  };
};

export const sendPeopleCore = async ({
  input,
  client = new CoreApiClient(),
}: {
  input: SendPeopleInput;
  client?: CoreApiClient;
}) => {
  const apiUrl = process.env.HEYBEN_API_URL?.trim();
  const apiKey = process.env.HEYBEN_CRM_API_KEY?.trim();
  const fallbackCompanyId = process.env.HEYBEN_COMPANY_ID?.trim();

  if (!apiUrl || !apiKey) {
    throw new Error(
      'Missing HEYBEN_API_URL or HEYBEN_CRM_API_KEY app variables',
    );
  }

  const recordIds = toRecordIds(input);
  const people = await readPeople({ client, recordIds });

  const contacts = [];
  const skipped: string[] = [];
  for (const person of people) {
    const payload = toContactPayload(person);
    if (!payload) {
      skipped.push(person.id);
      await client.mutation({
        updatePerson: {
          __args: {
            id: person.id,
            data: { heybenSyncStatus: 'SKIPPED' },
          },
          id: true,
        },
      });
      continue;
    }
    contacts.push(payload);
  }

  if (contacts.length === 0) {
    return {
      success: true,
      total: recordIds.length,
      synced: 0,
      skipped: skipped.length,
      errored: 0,
    };
  }

  const syncToXero =
    process.env.HEYBEN_SYNC_TO_XERO?.trim().toLowerCase() === 'true';

  const { results } = await postHeyBenUpsert({
    apiUrl,
    apiKey,
    companyId: fallbackCompanyId,
    convertProspectsToCustomers: input.convertProspectsToCustomers !== false,
    syncToXero,
    contacts,
  });

  let synced = 0;
  let errored = 0;
  const now = new Date().toISOString();

  for (const result of results) {
    if (result.success) {
      synced += 1;
      await client.mutation({
        updatePerson: {
          __args: {
            id: result.externalPersonId,
            data: {
              heybenSyncStatus: 'SYNCED',
              heyofficeMemberId: result.heyofficeMemberId ?? null,
              heybenContactId: result.heybenContactId ?? null,
              heybenSyncedAt: now,
            },
          },
          id: true,
        },
      });
    } else {
      errored += 1;
      await client.mutation({
        updatePerson: {
          __args: {
            id: result.externalPersonId,
            data: { heybenSyncStatus: 'ERROR' },
          },
          id: true,
        },
      });
    }
  }

  return {
    success: errored === 0,
    total: recordIds.length,
    synced,
    skipped: skipped.length,
    errored,
    results,
  };
};
