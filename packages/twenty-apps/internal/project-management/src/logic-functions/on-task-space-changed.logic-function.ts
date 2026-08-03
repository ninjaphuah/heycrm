import {
  type DatabaseEventPayload,
  type ObjectRecordUpdateEvent,
  defineLogicFunction,
} from 'twenty-sdk/define';

import { ON_TASK_SPACE_CHANGED_FN_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { syncTaskProjectFromSpace } from 'src/logic-functions/sync-task-project';

type TaskRow = { id: string; spaceId?: string | null };

export const handler = async (
  payload: DatabaseEventPayload<ObjectRecordUpdateEvent<TaskRow>>,
): Promise<Record<string, unknown>> => {
  const { after, updatedFields } = payload.properties;

  // Only react to the space moving. Without this guard the projectId write below
  // re-triggers task.updated and loops.
  if (updatedFields?.includes('spaceId') !== true) {
    return {};
  }

  const taskId = after?.id;

  if (taskId === undefined) {
    return {};
  }

  return syncTaskProjectFromSpace({
    taskId,
    spaceId: after.spaceId ?? null,
  });
};

export default defineLogicFunction({
  universalIdentifier: ON_TASK_SPACE_CHANGED_FN_UNIVERSAL_IDENTIFIER,
  name: 'on-task-space-changed',
  timeoutSeconds: 15,
  handler,
  databaseEventTriggerSettings: { eventName: 'task.updated' },
});
