import { type CoreApiClient } from 'twenty-client-sdk/core';

export type PersonNode = {
  id: string;
  name?: { firstName?: string | null; lastName?: string | null } | null;
  emails?: { primaryEmail?: string | null } | null;
  phones?: { primaryPhoneNumber?: string | null } | null;
  jobTitle?: string | null;
  company?: {
    id?: string | null;
    name?: string | null;
    domainName?: { primaryLinkUrl?: string | null } | null;
  } | null;
};

export const readPeople = async ({
  client,
  recordIds,
}: {
  client: CoreApiClient;
  recordIds: string[];
}): Promise<PersonNode[]> => {
  if (recordIds.length === 0) {
    return [];
  }

  const result = (await client.query({
    people: {
      __args: { filter: { id: { in: recordIds } }, first: recordIds.length },
      edges: {
        node: {
          id: true,
          name: { firstName: true, lastName: true },
          emails: { primaryEmail: true },
          phones: { primaryPhoneNumber: true },
          jobTitle: true,
          company: {
            id: true,
            name: true,
            domainName: { primaryLinkUrl: true },
          },
        },
      },
    },
  })) as { people?: { edges?: { node: PersonNode }[] } };

  const edges = result.people?.edges;
  if (!Array.isArray(edges)) {
    return [];
  }

  return edges
    .map((edge) => edge?.node)
    .filter(
      (personNode): personNode is PersonNode =>
        typeof personNode?.id === 'string' && personNode.id.length > 0,
    );
};
