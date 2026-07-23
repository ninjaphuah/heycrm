import { Logger } from '@nestjs/common';

import chunk from 'lodash.chunk';
import { FieldActorSource } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';

import { Process } from 'src/engine/core-modules/message-queue/decorators/process.decorator';
import { Processor } from 'src/engine/core-modules/message-queue/decorators/processor.decorator';
import { InjectMessageQueue } from 'src/engine/core-modules/message-queue/decorators/message-queue.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/core-modules/message-queue/services/message-queue.service';
import { ConnectedAccountMetadataService } from 'src/engine/metadata-modules/connected-account/connected-account-metadata.service';
import { CONTACTS_CREATION_BATCH_SIZE } from 'src/modules/contact-creation-manager/constants/contacts-creation-batch-size.constant';
import { GooglePeopleGetContactsService } from 'src/modules/contact-creation-manager/google-contacts-import/services/google-people-get-contacts.service';
import {
  CreateCompanyAndContactJob,
  type CreateCompanyAndContactJobData,
} from 'src/modules/contact-creation-manager/jobs/create-company-and-contact.job';

export type ImportGoogleContactsJobData = {
  workspaceId: string;
  connectedAccountId: string;
};

@Processor(MessageQueue.contactCreationQueue)
export class ImportGoogleContactsJob {
  private readonly logger = new Logger(ImportGoogleContactsJob.name);

  constructor(
    private readonly connectedAccountMetadataService: ConnectedAccountMetadataService,
    private readonly googlePeopleGetContactsService: GooglePeopleGetContactsService,
    @InjectMessageQueue(MessageQueue.contactCreationQueue)
    private readonly contactCreationQueueService: MessageQueueService,
  ) {}

  @Process(ImportGoogleContactsJob.name)
  async handle(data: ImportGoogleContactsJobData): Promise<void> {
    const { workspaceId, connectedAccountId } = data;

    const connectedAccount =
      await this.connectedAccountMetadataService.findById({
        id: connectedAccountId,
        workspaceId,
      });

    if (!isDefined(connectedAccount)) {
      this.logger.warn(
        `Skipping Google Contacts import: account ${connectedAccountId} not found`,
      );

      return;
    }

    const contacts =
      await this.googlePeopleGetContactsService.getContacts(connectedAccount);

    if (contacts.length === 0) {
      this.logger.log(
        `No Google Contacts with email found for account ${connectedAccountId}`,
      );

      return;
    }

    const batches = chunk(contacts, CONTACTS_CREATION_BATCH_SIZE);

    for (const contactsToCreate of batches) {
      await this.contactCreationQueueService.add<CreateCompanyAndContactJobData>(
        CreateCompanyAndContactJob.name,
        {
          workspaceId,
          connectedAccount,
          contactsToCreate,
          source: FieldActorSource.IMPORT,
        },
      );
    }

    this.logger.log(
      `Queued ${contacts.length} Google Contacts for account ${connectedAccountId} in ${batches.length} batch(es)`,
    );
  }
}
