import { type ConnectedAccount } from '@/accounts/types/ConnectedAccount';
import { GOOGLE_CONTACTS_READONLY_SCOPE } from '@/accounts/constants/GoogleContactsReadonlyScope';
import { useApolloClient, useMutation } from '@apollo/client/react';
import {
  CalendarChannelSyncStage,
  ConnectedAccountProvider,
  MessageChannelSyncStage,
  SettingsPath,
} from 'twenty-shared/types';

import { useTriggerProviderReconnect } from '@/settings/accounts/hooks/useTriggerProviderReconnect';
import { IMPORT_GOOGLE_CONTACTS } from '@/settings/accounts/graphql/mutations/importGoogleContacts';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useCloseDropdown } from '@/ui/layout/dropdown/hooks/useCloseDropdown';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { useModal } from '@/ui/layout/modal/hooks/useModal';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { Trans, useLingui } from '@lingui/react/macro';
import {
  IconAddressBook,
  IconAt,
  IconCalendarEvent,
  IconDotsVertical,
  IconMail,
  IconPlayerPlay,
  IconRefresh,
  IconTrash,
} from 'twenty-ui/icon';
import { LightIconButton } from 'twenty-ui/input';
import { MenuItem } from 'twenty-ui/navigation';
import { useNavigateSettings } from '~/hooks/useNavigateSettings';
import { DELETE_CONNECTED_ACCOUNT } from '../graphql/mutations/deleteConnectedAccount';

type SettingsAccountsRowDropdownMenuProps = {
  account: ConnectedAccount;
};

export const SettingsAccountsRowDropdownMenu = ({
  account,
}: SettingsAccountsRowDropdownMenuProps) => {
  const dropdownId = `settings-account-row-${account.id}`;
  const deleteAccountModalId = `delete-account-modal-${account.id}`;
  const accountHandle = account.handle;

  const { t } = useLingui();
  const { openModal } = useModal();
  const { enqueueSuccessSnackBar, enqueueErrorSnackBar } = useSnackBar();

  const navigate = useNavigateSettings();
  const { closeDropdown } = useCloseDropdown();

  const apolloClient = useApolloClient();
  const [deleteConnectedAccountMutation] = useMutation(
    DELETE_CONNECTED_ACCOUNT,
  );
  const [importGoogleContactsMutation] = useMutation(IMPORT_GOOGLE_CONTACTS);
  const { triggerProviderReconnect } = useTriggerProviderReconnect();

  const hasPendingConfiguration =
    account.messageChannels.some(
      (channel) =>
        channel.syncStage === MessageChannelSyncStage.PENDING_CONFIGURATION,
    ) ||
    account.calendarChannels.some(
      (channel) =>
        channel.syncStage === CalendarChannelSyncStage.PENDING_CONFIGURATION,
    );

  const hasGoogleContactsScope = (account.scopes ?? []).includes(
    GOOGLE_CONTACTS_READONLY_SCOPE,
  );

  const deleteAccount = async () => {
    await deleteConnectedAccountMutation({
      variables: { id: account.id },
    });
    await apolloClient.refetchQueries({ include: 'active' });
  };

  const handleImportGoogleContacts = async () => {
    closeDropdown(dropdownId);

    if (!hasGoogleContactsScope) {
      await triggerProviderReconnect(account.provider, account.id, {
        loginHint: account.handle,
      });
      return;
    }

    try {
      await importGoogleContactsMutation({
        variables: { connectedAccountId: account.id },
      });
      enqueueSuccessSnackBar({
        message: t`Google Contacts import started`,
      });
    } catch {
      enqueueErrorSnackBar({
        message: t`Failed to start Google Contacts import`,
      });
    }
  };

  return (
    <>
      <Dropdown
        dropdownId={dropdownId}
        dropdownPlacement="right-start"
        clickableComponent={
          <LightIconButton Icon={IconDotsVertical} accent="tertiary" />
        }
        dropdownComponents={
          <DropdownContent>
            <DropdownMenuItemsContainer>
              {hasPendingConfiguration && (
                <MenuItem
                  LeftIcon={IconPlayerPlay}
                  text={t`Complete setup`}
                  onClick={() => {
                    navigate(SettingsPath.AccountsConfiguration, {
                      connectedAccountId: account.id,
                    });
                    closeDropdown(dropdownId);
                  }}
                />
              )}
              {account.provider ===
                ConnectedAccountProvider.IMAP_SMTP_CALDAV && (
                <MenuItem
                  text={t`Connection settings`}
                  LeftIcon={IconAt}
                  onClick={() => {
                    navigate(SettingsPath.EditImapSmtpCaldavConnection, {
                      connectedAccountId: account.id,
                    });
                    closeDropdown(dropdownId);
                  }}
                />
              )}
              <MenuItem
                LeftIcon={IconMail}
                text={t`Emails settings`}
                onClick={() => {
                  navigate(SettingsPath.AccountsEmails);
                  closeDropdown(dropdownId);
                }}
              />
              <MenuItem
                LeftIcon={IconCalendarEvent}
                text={t`Calendar settings`}
                onClick={() => {
                  navigate(SettingsPath.AccountsCalendars);
                  closeDropdown(dropdownId);
                }}
              />
              {account.provider === ConnectedAccountProvider.GOOGLE && (
                <MenuItem
                  LeftIcon={IconAddressBook}
                  text={t`Import Google Contacts`}
                  onClick={handleImportGoogleContacts}
                />
              )}
              {account.authFailedAt && (
                <MenuItem
                  LeftIcon={IconRefresh}
                  text={t`Reconnect`}
                  onClick={() => {
                    triggerProviderReconnect(account.provider, account.id);
                    closeDropdown(dropdownId);
                  }}
                />
              )}
              <MenuItem
                accent="danger"
                LeftIcon={IconTrash}
                text={t`Remove account`}
                onClick={() => {
                  closeDropdown(dropdownId);
                  openModal(deleteAccountModalId);
                }}
              />
            </DropdownMenuItemsContainer>
          </DropdownContent>
        }
      />
      <ConfirmationModal
        modalInstanceId={deleteAccountModalId}
        title={t`Data deletion`}
        subtitle={
          <Trans>
            All emails and events linked to this account ({accountHandle}) will
            be deleted
          </Trans>
        }
        onConfirmClick={deleteAccount}
        confirmButtonText={t`Delete account`}
      />
    </>
  );
};
