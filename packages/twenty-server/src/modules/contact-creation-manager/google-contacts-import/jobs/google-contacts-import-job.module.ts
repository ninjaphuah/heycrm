import { Module } from '@nestjs/common';

import { ConnectedAccountMetadataModule } from 'src/engine/metadata-modules/connected-account/connected-account-metadata.module';
import { ImportGoogleContactsJob } from 'src/modules/contact-creation-manager/google-contacts-import/jobs/import-google-contacts.job';
import { GooglePeopleGetContactsService } from 'src/modules/contact-creation-manager/google-contacts-import/services/google-people-get-contacts.service';
import { OAuth2ClientManagerModule } from 'src/modules/connected-account/oauth2-client-manager/oauth2-client-manager.module';

@Module({
  imports: [ConnectedAccountMetadataModule, OAuth2ClientManagerModule],
  providers: [ImportGoogleContactsJob, GooglePeopleGetContactsService],
})
export class GoogleContactsImportJobModule {}
