import gql from 'graphql-tag';

export const IMPORT_GOOGLE_CONTACTS = gql`
  mutation ImportGoogleContacts($connectedAccountId: UUID!) {
    importGoogleContacts(connectedAccountId: $connectedAccountId) {
      success
    }
  }
`;
