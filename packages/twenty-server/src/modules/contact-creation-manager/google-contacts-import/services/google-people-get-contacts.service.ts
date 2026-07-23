import { Injectable, Logger } from '@nestjs/common';

import { isNonEmptyString } from '@sniptt/guards';
import { google } from 'googleapis';

import { type ConnectedAccountEntity } from 'src/engine/metadata-modules/connected-account/entities/connected-account.entity';
import { type Contact } from 'src/modules/contact-creation-manager/types/contact.type';
import { GoogleOAuth2ClientProvider } from 'src/modules/connected-account/oauth2-client-manager/drivers/google/google-oauth2-client.provider';

@Injectable()
export class GooglePeopleGetContactsService {
  private readonly logger = new Logger(GooglePeopleGetContactsService.name);

  constructor(
    private readonly googleOAuth2ClientProvider: GoogleOAuth2ClientProvider,
  ) {}

  public async getContacts(
    connectedAccount: Pick<ConnectedAccountEntity, 'id'>,
  ): Promise<Contact[]> {
    const oAuth2Client = await this.googleOAuth2ClientProvider.getClient(
      connectedAccount.id,
    );

    const peopleClient = google.people({
      version: 'v1',
      auth: oAuth2Client,
    });

    const contactsByHandle = new Map<string, Contact>();
    let pageToken: string | undefined;
    let hasMore = true;

    while (hasMore) {
      const response = await peopleClient.people.connections.list({
        resourceName: 'people/me',
        pageSize: 1000,
        personFields: 'names,emailAddresses',
        pageToken,
      });

      const connections = response.data.connections ?? [];

      for (const person of connections) {
        const emailAddresses = person.emailAddresses ?? [];
        const primaryEmail =
          emailAddresses.find((email) => email.metadata?.primary)?.value ??
          emailAddresses[0]?.value;

        if (!isNonEmptyString(primaryEmail)) {
          continue;
        }

        const handle = primaryEmail.trim().toLowerCase();
        const displayName =
          person.names?.find((name) => name.metadata?.primary)?.displayName ??
          person.names?.[0]?.displayName ??
          handle;

        if (!contactsByHandle.has(handle)) {
          contactsByHandle.set(handle, {
            handle,
            displayName: isNonEmptyString(displayName) ? displayName : handle,
          });
        }
      }

      pageToken = response.data.nextPageToken ?? undefined;
      hasMore = isNonEmptyString(pageToken);
    }

    this.logger.log(
      `Fetched ${contactsByHandle.size} Google Contacts for account ${connectedAccount.id}`,
    );

    return Array.from(contactsByHandle.values());
  }
}
