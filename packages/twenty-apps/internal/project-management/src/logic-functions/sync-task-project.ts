import { RestApiClient } from 'twenty-client-sdk/rest';

type SpaceRow = { id: string; projectId: string | null };

type TaskPage = {
  data: { tasks: { id: string }[] };
  pageInfo?: { hasNextPage?: boolean; endCursor?: string };
};

/**
 * Why this exists.
 *
 * The hierarchy is Project → Space → Task, so a task's project is implied by its
 * space and storing it again is redundant. But Twenty view filters resolve a
 * single field on the view's own object — `subFieldName` covers composite fields
 * like name.firstName, not relation hops — so a Task view cannot filter or group
 * by `space.project`. Without a real `projectId` column on the task there is no
 * way to build "all tasks in this project".
 *
 * So `task.project` is a denormalised mirror of `task.space.project`, and these
 * triggers are what keep it honest. Nobody should set it by hand.
 */
export const syncTaskProjectFromSpace = async ({
  taskId,
  spaceId,
}: {
  taskId: string;
  spaceId: string | null;
}): Promise<Record<string, unknown>> => {
  const client = new RestApiClient();

  // A task pulled out of every space loses its project too, rather than keeping
  // a stale one.
  if (spaceId === null) {
    await client.patch(`/rest/tasks/${taskId}`, { projectId: null });

    return { taskId, projectId: null };
  }

  const spaceResponse = await client.get<{ data: { space: SpaceRow | null } }>(
    `/rest/spaces/${spaceId}`,
  );
  const projectId = spaceResponse.data.space?.projectId ?? null;

  await client.patch(`/rest/tasks/${taskId}`, { projectId });

  return { taskId, projectId };
};

/**
 * Re-point every task under a space when the space itself moves between
 * projects. Paged rather than assuming one request covers the space.
 */
export const syncTasksForSpace = async (
  spaceId: string,
): Promise<Record<string, unknown>> => {
  const client = new RestApiClient();

  const spaceResponse = await client.get<{ data: { space: SpaceRow | null } }>(
    `/rest/spaces/${spaceId}`,
  );
  const projectId = spaceResponse.data.space?.projectId ?? null;

  const PAGE_SIZE = 60;
  let startingAfter: string | undefined = undefined;
  let updated = 0;

  for (;;) {
    const query: Record<string, string | number> = {
      filter: `spaceId[eq]:${spaceId}`,
      limit: PAGE_SIZE,
    };

    if (startingAfter !== undefined) {
      query.starting_after = startingAfter;
    }

    const tasksResponse: TaskPage = await client.get<TaskPage>('/rest/tasks', {
      query,
    });

    const tasks = tasksResponse.data.tasks ?? [];

    for (const task of tasks) {
      await client.patch(`/rest/tasks/${task.id}`, { projectId });
      updated += 1;
    }

    const hasNextPage: boolean = tasksResponse.pageInfo?.hasNextPage ?? false;
    const endCursor: string | undefined = tasksResponse.pageInfo?.endCursor;

    if (!hasNextPage || endCursor === undefined || tasks.length === 0) {
      break;
    }

    startingAfter = endCursor;
  }

  return { spaceId, projectId, updated };
};
