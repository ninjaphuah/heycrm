import {
  type DatabaseEventPayload,
  type ObjectRecordCreateEvent,
  defineLogicFunction,
} from 'twenty-sdk/define';

import { ON_TASK_CREATED_FN_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { syncTaskProjectFromSpace } from 'src/logic-functions/sync-task-project';

type TaskRow = { id: string; spaceId?: string | null };

/**
 * A task created straight into a space (the normal path from a space record page)
 * needs its project stamped at birth — task.updated never fires for it.
 */
export const handler = async (
  payload: DatabaseEventPayload<ObjectRecordCreateEvent<TaskRow>>,
): Promise<Record<string, unknown>> => {
  const { after } = payload.properties;
  const taskId = after?.id;
  const spaceId = after?.spaceId ?? null;

  // Nothing to derive for a task with no space; leave projectId as supplied.
  if (taskId === undefined || spaceId === null) {
    return {};
  }

  return syncTaskProjectFromSpace({ taskId, spaceId });
};

export default defineLogicFunction({
  universalIdentifier: ON_TASK_CREATED_FN_UNIVERSAL_IDENTIFIER,
  name: 'on-task-created',
  timeoutSeconds: 15,
  handler,
  databaseEventTriggerSettings: { eventName: 'task.created' },
});
