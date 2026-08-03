import {
  type DatabaseEventPayload,
  type ObjectRecordUpdateEvent,
  defineLogicFunction,
} from 'twenty-sdk/define';

import { ON_SPACE_PROJECT_CHANGED_FN_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { syncTasksForSpace } from 'src/logic-functions/sync-task-project';

type SpaceRow = { id: string; projectId?: string | null };

/**
 * Move a space to another project and every task inside it follows. Without this
 * the tasks keep pointing at the old project and project-level views go wrong.
 */
export const handler = async (
  payload: DatabaseEventPayload<ObjectRecordUpdateEvent<SpaceRow>>,
): Promise<Record<string, unknown>> => {
  const { after, updatedFields } = payload.properties;

  if (updatedFields?.includes('projectId') !== true) {
    return {};
  }

  const spaceId = after?.id;

  if (spaceId === undefined) {
    return {};
  }

  return syncTasksForSpace(spaceId);
};

export default defineLogicFunction({
  universalIdentifier: ON_SPACE_PROJECT_CHANGED_FN_UNIVERSAL_IDENTIFIER,
  name: 'on-space-project-changed',
  // Fans out one PATCH per task in the space, so it needs more room than the
  // single-record handlers.
  timeoutSeconds: 60,
  handler,
  databaseEventTriggerSettings: { eventName: 'space.updated' },
});
