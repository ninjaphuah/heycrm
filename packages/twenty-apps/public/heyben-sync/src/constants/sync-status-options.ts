export const SYNC_STATUS_OPTIONS = [
  {
    key: 'PENDING',
    value: 'PENDING',
    label: 'Pending',
    color: 'gray',
    position: 0,
  },
  {
    key: 'SYNCED',
    value: 'SYNCED',
    label: 'Synced',
    color: 'green',
    position: 1,
  },
  {
    key: 'ERROR',
    value: 'ERROR',
    label: 'Error',
    color: 'red',
    position: 2,
  },
  {
    key: 'SKIPPED',
    value: 'SKIPPED',
    label: 'Skipped',
    color: 'orange',
    position: 3,
  },
] as const;
