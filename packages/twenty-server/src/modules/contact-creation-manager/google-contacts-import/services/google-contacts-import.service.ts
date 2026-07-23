import { Injectable } from '@nestjs/common';

import { msg } from '@lingui/core/macro';
import { ConnectedAccountProvider } from 'twenty-shared/types';

import { InjectMessageQueue } from 'src/engine/core-modules/message-queue/decorators/message-queue.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/core-modules/message-queue/services/message-queue.service';
import {
  ConnectedAccountException,
  ConnectedAccountExceptionCode,
} from 'src/engine/metadata-modules/connected-account/connected-account.exception';
import { ConnectedAccountMetadataService } from 'src/engine/metadata-modules/connected-account/connected-account-metadata.service';
import { GOOGLE_CONTACTS_READONLY_SCOPE } from 'src/modules/contact-creation-manager/google-contacts-import/constants/google-contacts-readonly-scope.constant';
import {
  ImportGoogleContactsJob,
  type ImportGoogleContactsJobData,
} from 'src/modules/contact-creation-manager/google-contacts-import/jobs/import-google-contacts.job';

@Injectable()
export class GoogleContactsImportService {
  constructor(
    private readonly connectedAccountMetadataService: ConnectedAccountMetadataService,
    @InjectMessageQueue(MessageQueue.contactCreationQueue)
    private readonly contactCreationQueueService: MessageQueueService,
  ) {}

  async enqueueImport({
    connectedAccountId,
    workspaceId,
    userWorkspaceId,
  }: {
    connectedAccountId: string;
    workspaceId: string;
    userWorkspaceId: string;
  }): Promise<void> {
    const connectedAccount =
      await this.connectedAccountMetadataService.verifyOwnership({
        id: connectedAccountId,
        userWorkspaceId,
        workspaceId,
      });

    if (connectedAccount.provider !== ConnectedAccountProvider.GOOGLE) {
      throw new ConnectedAccountException(
        `Connected account ${connectedAccountId} is not a Google account`,
        ConnectedAccountExceptionCode.INVALID_CONNECTED_ACCOUNT_INPUT,
        {
          userFriendlyMessage: msg`Google Contacts import is only available for Google accounts.`,
        },
      );
    }

    const scopes = connectedAccount.scopes ?? [];
    const hasContactsScope = scopes.includes(GOOGLE_CONTACTS_READONLY_SCOPE);

    if (!hasContactsScope) {
      throw new ConnectedAccountException(
        `Connected account ${connectedAccountId} is missing Google Contacts scope`,
        ConnectedAccountExceptionCode.INVALID_CONNECTED_ACCOUNT_INPUT,
        {
          userFriendlyMessage: msg`Reconnect this Google account to grant Contacts access, then try again.`,
        },
      );
    }

    await this.contactCreationQueueService.add<ImportGoogleContactsJobData>(
      ImportGoogleContactsJob.name,
      {
        workspaceId,
        connectedAccountId,
      },
    );
  }
}
