import { RestApiClient } from 'twenty-client-sdk/rest';
import { enqueueSnackbar } from 'twenty-sdk/front-component';

export const execute = async ({
  path,
  recordIds,
}: {
  path: string;
  recordIds: string[];
}) => {
  try {
    const client = new RestApiClient();
    await client.post(`/s${path}`, { recordIds });
    await enqueueSnackbar({
      message:
        recordIds.length > 1
          ? 'Sent people to HeyBen / HeyOffice.'
          : 'Sent person to HeyBen / HeyOffice.',
      variant: 'success',
    });
  } catch {
    await enqueueSnackbar({
      message: 'Failed to send contacts to HeyBen',
      variant: 'error',
    });
  }
};
