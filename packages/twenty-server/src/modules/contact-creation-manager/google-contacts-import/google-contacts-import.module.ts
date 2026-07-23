import { Module } from '@nestjs/common';

import { ConnectedAccountMetadataModule } from 'src/engine/metadata-modules/connected-account/connected-account-metadata.module';
import { PermissionsModule } from 'src/engine/metadata-modules/permissions/permissions.module';
import { GoogleContactsImportResolver } from 'src/modules/contact-creation-manager/google-contacts-import/google-contacts-import.resolver';
import { GoogleContactsImportService } from 'src/modules/contact-creation-manager/google-contacts-import/services/google-contacts-import.service';
import { GooglePeopleGetContactsService } from 'src/modules/contact-creation-manager/google-contacts-import/services/google-people-get-contacts.service';
import { OAuth2ClientManagerModule } from 'src/modules/connected-account/oauth2-client-manager/oauth2-client-manager.module';

@Module({
  imports: [
    ConnectedAccountMetadataModule,
    PermissionsModule,
    OAuth2ClientManagerModule,
  ],
  providers: [
    GoogleContactsImportResolver,
    GoogleContactsImportService,
    GooglePeopleGetContactsService,
  ],
  exports: [GoogleContactsImportService, GooglePeopleGetContactsService],
})
export class GoogleContactsImportModule {}
